import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from 'controllers/auth.controller';
import { Router } from 'express';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from 'middlewares/validation.middleware';
import { validate } from 'utils/helpers';

const AuthRouter = Router();

AuthRouter.post('/register', validate(registerSchema), registerController);

AuthRouter.post('/login', validate(loginSchema), loginController);

AuthRouter.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  forgotPasswordController,
);

AuthRouter.post(
  '/reset-password',
  validate(resetPasswordSchema),
  resetPasswordController,
);

export default AuthRouter;
