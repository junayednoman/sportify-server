/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TCart } from './cart.interface';
import { CartModel } from './cart.model';

const addCartIntoDb = async (payload: TCart) => {
  const isCartExist = await CartModel.findOne({ user: payload.user });

  if (isCartExist) {
    const newProductIds = payload.products.map((product) => product.productId);

    // Find the cart with existing products
    const existingCart = await CartModel.findOne({
      user: payload.user,
      'products.productId': { $in: newProductIds },
    });

    if (existingCart) {
      const updatedProducts = existingCart.products.map((existingProduct) => {
        // new product that matches with any existing product
        const newProductThatMatchesAnyExistingProduct = payload.products.find(
          (product) =>
            product.productId.toString() ===
            existingProduct.productId.toString(),
        );
        if (newProductThatMatchesAnyExistingProduct) {
          // Update the quantity of the existing product
          existingProduct.quantity +=
            newProductThatMatchesAnyExistingProduct.quantity;
          existingProduct.price +=
            newProductThatMatchesAnyExistingProduct.price;
          return existingProduct;
        }
        return existingProduct;
      });

      // Add fresh new products that do not exist in the cart
      const freshNewProducts = payload.products.filter(
        (product) =>
          !existingCart.products.some(
            (existingProduct) =>
              existingProduct.productId.toString() ===
              product.productId.toString(),
          ),
      );

      existingCart.products = [...updatedProducts, ...freshNewProducts];

      return await existingCart.save();
    } else {
      // Add new products to the existing cart
      isCartExist.products = [...isCartExist.products, ...payload.products];
      return await isCartExist.save();
    }
  }

  const result = await CartModel.create(payload);
  return result;
};

const retrieveCart = async (userId: string) => {
  const result = await CartModel.findOne({ user: userId }).populate('user');
  return result;
};

// Service to update the quantity of a product in the cart
const updateCartItemQuantityIntoDb = async (
  userId: string,
  productId: string,
  quantity: number,
  price: number,
) => {
  try {
    // Find the cart for the user
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
    }

    // Find the product in the cart
    const cartProduct = cart.products.find(
      (prod) => prod.productId.toString() === productId.toString(),
    );

    if (!cartProduct) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found in cart');
    }

    // Update the quantity
    cartProduct.quantity = quantity;
    cartProduct.price = price;

    // Save the updated cart
    await cart.save();

    // Return the updated cart or necessary details
    return cart;
  } catch (error: any) {
    throw new Error(`Failed to update cart: ${error.message}`);
  }
};

export const cartServices = { addCartIntoDb, retrieveCart, updateCartItemQuantityIntoDb };
