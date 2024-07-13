import { ObjectId, } from 'mongoose';

export type TCartProduct ={
  productId: ObjectId;
  quantity: number;
  price: number;
}

export type TCart = {
  user: ObjectId;
  products: TCartProduct[];
};
