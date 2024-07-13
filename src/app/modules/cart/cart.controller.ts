import catchAsyncError from '../../utils/catchAsyncError';
import handleDataNotFound from '../../utils/dataNotFound';
import successResponse from '../../utils/successResponse';
import { cartServices } from './cart.service';

const addCart = catchAsyncError(async (req, res) => {
  const payload = req.body;
  const result = await cartServices.addCartIntoDb(payload);
  successResponse(res, { data: result, message: 'Cart added successfully!' });
});

const retrieveCart = catchAsyncError(async (req, res) => {
  const userId = req.params.userId;
  const result = await cartServices.retrieveCart(userId);
  handleDataNotFound(result, res);
  successResponse(res, {
    data: result,
    message: 'Cart retrieved successfully!',
  });
});

const updateCartItemQuantity = catchAsyncError(async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity, price } = req.body;
  const result = await cartServices.updateCartItemQuantityIntoDb(
    userId,
    productId,
    quantity,
    price,
  );
  successResponse(res, {
    data: result,
    message: 'Cart quantity updated successfully!',
  });
});

const deleteCartProducts = catchAsyncError(async (req, res) => {
  const userId = req.params.userId;
  const {productIds} = req.body;
  const result = await cartServices.deleteCartProductsFromDb(
    userId,
    productIds,
  );
  successResponse(res, {
    data: result,
    message: 'Cart product deleted successfully!',
  });
});

export const cartControllers = {
  addCart,
  retrieveCart,
  updateCartItemQuantity,
  deleteCartProducts,
};
