import httpStatus from 'http-status';
import { ProductModel } from '../product/product.model';
import { AppError } from '../../errors/AppError';
import { TCartProduct } from './cart.interface';

export async function updateProductQuantities(
  products: Partial<TCartProduct[]>,
) {
  try {
    await Promise.all(
      products.map(async (product) => {
        const existingProduct = await ProductModel.findById(product!.productId);
        if (existingProduct) {
          const updatedq = (existingProduct.quantity -= product!.quantity);
          await ProductModel.findByIdAndUpdate(product!.productId, {
            quantity: updatedq,
          });
        }
      }),
    );
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update product quantities',
    );
  }
}
