import catchAsyncError from '../../utils/catchAsyncError';
import successResponse from '../../utils/successResponse';
import { productServices } from './product.service';

const createProduct = catchAsyncError(async (req, res) => {
  const productData = req.body;
  const result = await productServices.createProductIntoDb(productData);
  successResponse(res, {
    data: result,
    status: 201,
    message: 'Product created successfully!',
  });
});

const retrieveAllProducts = catchAsyncError(async (req, res) => {
  const result = await productServices.retrieveAllProductsFromDb();
  successResponse(res, {
    data: result,
    message: 'Product retrieved successfully!',
  });
});

export const productController = { createProduct, retrieveAllProducts };
