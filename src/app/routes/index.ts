import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { productRoutes } from '../modules/product/product.routes';
import { cartRoutes } from '../modules/cart/cart.routes';

const router = Router();

const apiRoutes = [
  { path: '/auth', route: AuthRoutes.authRouter },
  { path: '/products', route: productRoutes },
  { path: '/carts', route: cartRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
