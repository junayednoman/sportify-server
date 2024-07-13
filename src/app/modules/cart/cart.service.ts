/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TCart, TCartProduct } from './cart.interface';
import { CartModel } from './cart.model';
import { updateProductQuantities } from './cart.utils';
import { UserModel } from '../auth/auth.model';
import { ProductModel } from '../product/product.model';

const addCartIntoDb = async (payload: TCart) => {
  const isUserExist = await UserModel.findById(payload.user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID');
  }
  // Validate the new products
  await Promise.all(
    payload.products.map(async (product: TCartProduct) => {
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

      const result = await existingCart.save();
      updateProductQuantities(payload.products);
      return result;
    } else {
      // Add new products to the existing cart
      isCartExist.products = [...isCartExist.products, ...payload.products];
      const result = await isCartExist.save();
      updateProductQuantities(payload.products);
      return result;
    }
  }

  const result = await CartModel.create(payload);
  updateProductQuantities(payload.products);
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
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Invalid product Id: ${productId}`,
      );
    }

    // Update the quantity
    cartProduct.quantity = quantity;
    cartProduct.price = price;

    await cart.save();
    return cart;
  } catch (error: any) {
    throw new Error(`Failed to update cart: ${error.message}`);
  }
};

const deleteCartProductsFromDb = async (
  userId: string,
  productIds: string[],
) => {
  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  productIds.map((productId) => {
    // Find the product in the cart
    const cartProduct = cart.products.find(
      (prod) => prod.productId.toString() === productId.toString(),
    );

    if (!cartProduct) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Invalid product Id: ${productId}`,
      );
    }
  });

  // Remove products from the cart
  cart.products = cart.products.filter(
    (product) => !productIds.includes(product.productId.toString()),
  );

  // Update the cart in the database
  const result = await cart.save();
  return result;
};

export const cartServices = {
  addCartIntoDb,
  retrieveCart,
  updateCartItemQuantityIntoDb,
  deleteCartProductsFromDb,
};
