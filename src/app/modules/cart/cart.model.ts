/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema } from 'mongoose';
import { TCart, TCartProduct } from './cart.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { ProductModel } from '../product/product.model';
import { UserModel } from '../auth/auth.model';

const cartProductSchema = new Schema<TCartProduct>({
  productId: { type: mongoose.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<TCart>({
  user: { type: mongoose.Types.ObjectId, required: true },
  products: { type: [cartProductSchema], required: true },
});

cartSchema.pre('save', async function (next) {
  try {
    const isUserExist = await UserModel.findById(this.user);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID');
    }
    // Validate the new products
    await Promise.all(
      this.products.map(async (product: TCartProduct) => {
        const isProductExist = await ProductModel.findById(product.productId);
        if (!isProductExist) {
          throw new AppError(
            httpStatus.NOT_FOUND,
            `Invalid product ID: ${product.productId}`,
          );
        }
        if (isProductExist.isDeleted) {
          throw new AppError(
            httpStatus.UNPROCESSABLE_ENTITY,
            `The product is deleted: ${product.productId}`,
          );
        }
        // Check sufficiency of product quantity
        if (isProductExist.quantity < product.quantity) {
          throw new AppError(
            httpStatus.UNPROCESSABLE_ENTITY,
            `Insufficient product quantity: ${product.productId}`,
          );
        }
      }),
    );
    next();
  } catch (err: any) {
    next(err);
  }
});

export const CartModel = mongoose.model<TCart>('cart', cartSchema);
