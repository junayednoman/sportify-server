/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema } from 'mongoose';
import { TCart, TCartProduct } from './cart.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../auth/auth.model';

const cartProductSchema = new Schema<TCartProduct>({
  productId: { type: mongoose.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<TCart>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    products: { type: [cartProductSchema], required: true },
  },
  { timestamps: true },
);

// check if user exists before fetching a cart
cartSchema.pre('findOne', async function (next) {
  const query = this.getQuery();
  const isUserExist = await UserModel.findOne({ _id: query.user });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID');
  }
  next();
});

export const CartModel = mongoose.model<TCart>('cart', cartSchema);
