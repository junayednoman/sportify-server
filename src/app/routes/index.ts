import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = Router();

const apiRoutes = [
  { path: '/auth', route: AuthRoutes.authRouter },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;