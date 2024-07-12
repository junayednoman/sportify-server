import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

export const productServices = { createProductIntoDb };
