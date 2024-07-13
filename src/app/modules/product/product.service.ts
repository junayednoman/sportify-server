import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const retrieveAllProductsFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

const retrieveSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateSingleProductIntoDb = async (id: string, payload: TProduct) => {
  const isProductExist = await ProductModel.findById(id);
  if (!isProductExist) {
    throw new AppError(404, 'Invalid product ID');
  } else if (isProductExist.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'The product is deleted!');
  }
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSingleProductIntoDb = async (id: string) => {
  const isProductExist = await ProductModel.findById(id);
  if (!isProductExist) {
    throw new AppError(404, 'Invalid product ID');
  } else if (isProductExist.isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'The product is already deleted!');
  }
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const productServices = {
  createProductIntoDb,
  retrieveAllProductsFromDb,
  retrieveSingleProductFromDb,
  updateSingleProductIntoDb,
  deleteSingleProductIntoDb,
};
