import { Request, Response } from 'express';
import {
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
} from 'services/auth.services';
import { getErrorMessage } from 'utils/helpers';
import logger from 'utils/logger';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    const response = await registerService(req.body, role as string);
    logger.info('User registered successfully.');
    res.status(201).json({
      status: true,
      message: 'User registered successfully.',
      data: {
        ...response,
      },
    });
  } catch (error) {
    const { statusCode, errorMessage } = await getErrorMessage(error);
    res.status(statusCode).json({
      status: false,
      message: errorMessage,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginService(req.body);
    logger.info('Login successfully.');
    res.status(200).json({
      status: 1,
      message: 'Login successfully.',
      data: {
        ...response,
      },
    });
  } catch (error) {
    const { statusCode, errorMessage } = await getErrorMessage(error);
    res.status(statusCode).json({
      status: false,
      message: errorMessage,
    });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const response = await forgotPasswordService(req.body);
    logger.info('Password reset link sent to your email.');
    res.status(200).json({
      status: 1,
      message: 'Password reset link sent to your email.',
      data: {
        ...response,
      },
    });
  } catch (error) {
    const { statusCode, errorMessage } = await getErrorMessage(error);
    res.status(statusCode).json({
      status: false,
      message: errorMessage,
    });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const response = await resetPasswordService(req.body);
    logger.info('Password reset successfully.');
    res.status(200).json({
      status: true,
      message: 'Password reset successfully.',
      data: {
        ...response,
      },
    });
  } catch (error) {
    const { statusCode, errorMessage } = await getErrorMessage(error);
    res.status(statusCode).json({
      status: false,
      message: errorMessage,
    });
  }
};
