import { Router } from 'express';
import AuthRouter from './authRoutes';

const rootRouter = Router();

const rootRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
];

[...rootRoutes].forEach((route) => {
  return rootRouter.use(route.path, route.route);
});

export default rootRouter;
