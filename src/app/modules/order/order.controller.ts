import catchAsyncError from '../../utils/catchAsyncError';
import successResponse from '../../utils/successResponse';
import { orderServices } from './order.service';

const createOrder = catchAsyncError(async (req, res) => {
  const orderData = req.body;
  const result = await orderServices.createOrderIntoDb(orderData);
  successResponse(res, {
    data: result,
    status: 201,
    message: 'Order created successfully!',
  });
});

export const orderController = {
  createOrder,
};
