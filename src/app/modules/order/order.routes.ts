import { Router } from 'express';
import { validateDataByZod } from '../../middleware/validateDataByZod';
import { authVerify } from '../../middleware/authVerify';
import { orderController } from './order.controller';
import { orderValidation } from './order.validation';

const router = Router();

router.post(
  '/',
  authVerify(),
  validateDataByZod(orderValidation.orderSchema),
  orderController.createOrder,
);

export const orderRoutes = router;
