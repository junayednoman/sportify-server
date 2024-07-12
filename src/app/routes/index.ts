import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { productRoutes } from '../modules/product/product.routes';

const router = Router();

const apiRoutes = [
  { path: '/auth', route: AuthRoutes.authRouter },
  { path: '/products', route: productRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
