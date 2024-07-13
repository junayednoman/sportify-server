import { z } from 'zod';

const objectIdValidation = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

const cartProductValidationSchema = z.object({
  productId: objectIdValidation,
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
});

const cartValidationSchema = z.object({
  user: objectIdValidation,
  products: z
    .array(cartProductValidationSchema)
    .nonempty({ message: 'Products array cannot be empty' }),
});

export const cartValidations = { cartValidationSchema };
