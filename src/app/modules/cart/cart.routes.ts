import { validateDataByZod } from './../../middleware/validateDataByZod';
import { Router } from 'express';
import { cartControllers } from './cart.controller';
import { cartValidations } from './cart.validation';

const router = Router();
router.post(
  '/',
  validateDataByZod(cartValidations.cartValidationSchema),
  cartControllers.addCart,
);
router.get('/:userId', cartControllers.retrieveCart);
router.put(
  '/:userId',
  validateDataByZod(cartValidations.updateCartItemProductQuantitySchema),
  cartControllers.updateCartItemQuantity,
);
router.delete(
  '/:userId',
  validateDataByZod(cartValidations.deleteCartProductsSchema),
  cartControllers.deleteCartProducts,
);

export const cartRoutes = router;
