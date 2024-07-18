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
router.get('/', productController.retrieveAllProducts);
router.get('/:id', productController.retrieveSingleProduct);
router.put(
  '/:id',
  validateDataByZod(productValidations.createProductSchema),
  productController.updateSingleProduct,
);

router.delete('/:id', productController.deleteSingleProduct);

export const productRoutes = router;
