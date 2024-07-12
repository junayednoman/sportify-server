import { Router } from 'express';
import { validateDataByZod } from '../../middleware/validateDataByZod';
import { productValidations } from './product.validation';
import { productController } from './product.controller';

const router = Router();

router.post(
  '/',
  validateDataByZod(productValidations.createProductSchema),
  productController.createProduct,
);

export const productRoutes = router;
