import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    total_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    order_note: { type: String },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<TOrder>('order', orderSchema);
