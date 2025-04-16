import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index';
import logger from '../utils/logger';
interface AuthRequest extends Request {
  user_id?: string;
}

export const verifyTokens = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      logger.error('Token not found');
      res.status(401).json({
        status: 0,
        message: 'You are not Authenticated.',
      });
      return;
    }

    const secretkey = config.jwt_secret_key;
    jwt.verify(token, secretkey, (err: any, data: any) => {
      if (err) {
        return res.status(403).json({
          status: 0,
          message: err?.message,
        });
      }

      logger.info('Token verified successfully');
      req.user_id = data?.token?.user_id;
      next();
    });
  } catch (error) {
    logger.error('Error in token verification:', error);
    res.status(500).json({
      status: 0,
      message: 'Internal server error during authentication',
    });
  }
};

// import config from 'config';
// import { NextFunction, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import logger from 'utils/logger';

// export const verifyTokens = (req: any, res: Response, next: NextFunction) => {
//   const token = req?.headers?.authorization?.split(' ')[1];
//   if (!token) {
//     logger.error('Token not found');
//     return res.status(401).json({
//       status: 0,
//       message: 'You are not Authenticated.',
//     });
//   } else {
//     jwt.verify(token, config.jwt_secret_key, async (err: any, data: any) => {
//       if (err)
//         return res.status(403).json({
//           status: 0,
//           message: err?.message,
//         });
//       logger.info('Token verified successfully');
//       req.user_id = data?.token?.user_id;
//       next();
//     });
//   }
// };
