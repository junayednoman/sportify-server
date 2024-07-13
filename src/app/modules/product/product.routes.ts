import { Router } from 'express';
import { validateDataByZod } from '../../middleware/validateDataByZod';
import { productValidations } from './product.validation';
import { productController } from './product.controller';
import { authVerify } from '../../middleware/authVerify';

const router = Router();

router.post(
  '/',
  authVerify(),
  validateDataByZod(productValidations.createProductSchema),
  productController.createProduct,
);
router.get('/', productController.retrieveAllProducts);
router.get('/:id', productController.retrieveSingleProduct);
router.put(
  '/:id',
  authVerify(),
  validateDataByZod(productValidations.createProductSchema),
  productController.updateSingleProduct,
);

router.delete('/:id', authVerify(), productController.deleteSingleProduct);

export const productRoutes = router;
