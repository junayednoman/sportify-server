import { cartServices } from '../cart/cart.service';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  if (result) {
    await cartServices.deleteCartProductsFromDb(
      payload.userId,
      payload.products.map(String),
    );
  }
  return result;
};

export const orderServices = {
  createOrderIntoDb,
};
