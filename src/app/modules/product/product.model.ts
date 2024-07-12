import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

export const ProductModel = mongoose.model('Product', productSchema);
