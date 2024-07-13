import catchAsyncError from '../../utils/catchAsyncError';
import successResponse from '../../utils/successResponse';
import { cartServices } from './cart.service';

const addCart = catchAsyncError(async (req, res) => {
  const payload = req.body;
  const result = await cartServices.addCartIntoDb(payload);
  successResponse(res, { data: result, message: 'Cart added successfully!' });
});

export const cartControllers = { addCart };
