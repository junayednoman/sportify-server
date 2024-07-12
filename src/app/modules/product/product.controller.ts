import catchAsyncError from '../../utils/catchAsyncError';
import handleDataNotFound from '../../utils/dataNotFound';
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
  handleDataNotFound(result, res);
  successResponse(res, {
    data: result,
    message: 'Products retrieved successfully!',
  });
});

const retrieveSingleProduct = catchAsyncError(async (req, res) => {
  const result = await productServices.retrieveSingleProductFromDb(
    req.params.id,
  );
  handleDataNotFound(result, res);
  successResponse(res, {
    data: result,
    message: 'Product retrieved successfully!',
  });
});

const updateSingleProduct = catchAsyncError(async (req, res) => {
  const result = await productServices.updateSingleProductIntoDb(
    req.params.id,
    req.body,
  );
  successResponse(res, {
    data: result,
    message: 'Product updated successfully!',
  });
});

export const productController = {
  createProduct,
  retrieveAllProducts,
  retrieveSingleProduct,
  updateSingleProduct,
};
