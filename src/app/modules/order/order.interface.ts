import { ObjectId } from 'mongoose';

export type TOrder = {
  orderId: string;
  userId: string;
  products: [ObjectId];
  total_amount: number;
  payment_method: string;
  user_name: string;
  email: string;
  phone: string;
  address: string;
  order_note: string;
};
