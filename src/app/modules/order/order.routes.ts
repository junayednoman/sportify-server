import { Router } from 'express';
import { validateDataByZod } from '../../middleware/validateDataByZod';
import { orderController } from './order.controller';
import { orderValidation } from './order.validation';

const router = Router();

router.post(
  '/',
  validateDataByZod(orderValidation.orderSchema),
  orderController.createOrder,
);

export const orderRoutes = router;
