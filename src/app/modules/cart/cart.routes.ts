import { Router } from 'express';
import { cartControllers } from './cart.controller';

const router = Router();
router.post('/', cartControllers.addCart);

export const cartRoutes = router;
