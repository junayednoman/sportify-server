import { ObjectId, } from 'mongoose';

export type TCartProduct ={
  productId: ObjectId;
  quantity: number;
  price: number;
  image: string
  name: string
}

export type TCart = {
  user: ObjectId;
  products: TCartProduct[];
};
