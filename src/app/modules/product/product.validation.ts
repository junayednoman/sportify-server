import { z } from 'zod';

const createProductSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    category: z.string().nonempty('Category is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    brand: z.string().nonempty('Brand is required'),
    price: z.number().positive('Price must be a positive number'),
    description: z.string().optional(),
    image: z.string().nonempty('Image is required'),
    tag: z.string().optional(),
    discount: z
      .number({ invalid_type_error: 'Discount must be a number' })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const productValidations = { createProductSchema };
