import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
    tag: { type: String },
    discount: { type: String },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', async function (next) {
  const isProductExist = await ProductModel.findOne({ name: this.name });
  if (isProductExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A product is already exist with this name',
      'name',
    );
  }
  next();
});

export const ProductModel = mongoose.model('Product', productSchema);
