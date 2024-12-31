import { loginController } from 'controllers/auth.controller';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/login', loginController);

export default AuthRouter;
