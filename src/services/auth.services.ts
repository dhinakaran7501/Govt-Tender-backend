import { RoleName } from '@prisma/client';
import { prisma } from 'config/prismaConfig';
import {
  ForgotPasswordParams,
  LoginRequestParams,
  RegisterRequestParams,
  ResetPasswordParams,
} from 'types/auth.types';
import { ErrorHandler } from 'utils/errorHandler';
import {
  comparePassword,
  generateOTP,
  generateTokens,
  hashPassword,
} from 'utils/helpers';
import { otpTemplate, sendEmail } from 'utils/nodemailer';

export const registerService = async (
  reqData: RegisterRequestParams,
  role_name: string,
) => {
  const { userData, company_details, company_contact_details } = reqData;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const isRole = await prisma.role.findUnique({
        where: {
          role_name: role_name as RoleName,
        },
      });

      if (!isRole) {
        throw new ErrorHandler('Role not found.', 404);
      }

      const isExistingUser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });
      if (isExistingUser) {
        throw new ErrorHandler(
          'User already exists with this email address.',
          409,
        );
      }

      const hashedPassword = await hashPassword(userData.password);

      const createNewuser = await prisma.user.create({
        data: {
          ...userData,
          role_id: isRole.role_id,
          password: hashedPassword,
        },
      });

      const createCompanyDetails = await prisma.companyDetails.create({
        data: {
          ...company_details,
          user_id: createNewuser.id,
        },
      });

      const createCompanyContactDetails =
        await prisma.companyContactDetails.create({
          data: {
            ...company_contact_details,
            company_id: createCompanyDetails.id,
          },
        });

      return {
        userData: createNewuser,
        company_details: createCompanyDetails,
        company_contact_details: createCompanyContactDetails,
      };
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (reqData: LoginRequestParams) => {
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: reqData.email,
      },
      include: {
        role: true,
      },
    });

    if (!isExistingUser) {
      throw new ErrorHandler('User not found.', 404);
    }

    const isPasswordValid = await comparePassword(
      reqData.password,
      isExistingUser.password,
    );

    if (!isPasswordValid) {
      throw new ErrorHandler('Password is incorrect.', 401);
    }

    const { accessToken } = generateTokens({
      id: isExistingUser.id,
      name: isExistingUser.name,
      email: isExistingUser.email,
      role: isExistingUser.role.role_name,
    });

    const updateUserData = await prisma.user.update({
      where: {
        id: isExistingUser.id,
      },
      data: {
        token: accessToken,
      },
      include: {
        role: true,
      },
    });

    return {
      id: updateUserData.id,
      name: updateUserData.name,
      email: updateUserData.email,
      role: updateUserData.role.role_name,
      token: accessToken,
    };
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (reqData: ForgotPasswordParams) => {
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: reqData.email,
      },
    });
    if (!isExistingUser) {
      throw new ErrorHandler('User not found.', 404);
    }

    const otpCode = await generateOTP(6);

    const updateUserData = await prisma.otp.update({
      where: {
        user_id: isExistingUser.id,
      },
      data: {
        otp_code: otpCode,
      },
    });

    if (!updateUserData) {
      throw new ErrorHandler('Failed to update OTP.', 500);
    }

    const mailOption = {
      email: isExistingUser?.email,
      subject: 'OTP Verification',
      message: otpTemplate(updateUserData.otp_code),
    };

    await sendEmail(mailOption);

    return {
      remaining_timing: '1m',
      OTP: updateUserData.otp_code,
    };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (reqData: ResetPasswordParams) => {
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: reqData.email,
      },
      include: {
        Otp: true,
      },
    });

    if (!isExistingUser) {
      throw new ErrorHandler('User not found.', 404);
    }

    const currentDate = new Date();
    const existingDate = new Date(isExistingUser.Otp[0]?.updated_at);
    const isExpired =
      currentDate.getTime() - existingDate.getTime() > 60 * 1000;

    if (isExpired) {
      throw new ErrorHandler('Your OTP is expired.', 401);
    }

    const hashedPassword = await hashPassword(reqData.password);

    const updateResponse = await prisma.user.update({
      where: {
        id: isExistingUser.id,
      },
      data: {
        password: hashedPassword,
      },
      include: {
        role: true,
      },
    });

    const {
      name,
      email,
      Correspondence_email,
      country_code,
      phone_number,
      role,
    } = updateResponse;

    return {
      name,
      email,
      Correspondence_email,
      country_code,
      phone_number,
      role_name: role.role_name,
    };
  } catch (error) {
    throw error;
  }
};
