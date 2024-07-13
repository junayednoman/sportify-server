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
          existingProduct.quantity += newProductThatMatchesAnyExistingProduct.quantity;
          existingProduct.price += newProductThatMatchesAnyExistingProduct.price;
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

export const cartServices = { addCartIntoDb };
