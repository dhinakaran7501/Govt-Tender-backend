import { CronJob } from 'cron';
import logger from './logger';
import { ErrorDetails, JobSchedulerProps } from '../types/helpers.type';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import JsonWebTokenError from 'jsonwebtoken';
import config from 'config';
import { ErrorHandler } from './errorHandler';

const jwt = JsonWebTokenError;

export const generateTokens = (data: any) => {
  const accessToken = jwt.sign({ token: data }, config.jwt_secret_key, {
    expiresIn: config.jwt_expiration,
  });
  const refreshToken = jwt.sign({ token: data }, config.jwt_secret_key, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  userPassword: string,
) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    return isPasswordValid;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        logger.error(
          err.errors.map((e) => ({
            message: e.message,
          })),
        );
        res.status(400).json({
          status: 0,
          errors: err.errors[0].message,
        });
      } else {
        res.status(500).json({
          status: 0,
          message: 'Internal server error',
        });
      }
    }
  };

export const generateOTP = async (length: number = 6) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars[randomIndex];
  }

  return otp;
};

export const getErrorMessage = async (
  error: unknown,
): Promise<ErrorDetails> => {
  const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
  const errorMessage =
    error instanceof ErrorHandler ? error.message : 'Internal Server Error.';

  logger.error(errorMessage);

  return { statusCode, errorMessage };
};

export const JobScheduler = ({
  cronTime,
  yourTaskFunction,
}: JobSchedulerProps) => {
  const job = new CronJob(cronTime, yourTaskFunction);
  job.start();
  logger.info(`Job scheduled to run at: ${cronTime}`);
};

// const MyTask = () => {
//   console.log("MY TASK");
// };

// JobScheduler({ cronTime: "* * * * * *", yourTaskFunction: MyTask });
