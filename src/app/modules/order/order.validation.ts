import * as z from 'zod';
const objectIdValidation = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

const orderSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, { message: 'Order ID is required' }),
    userId: objectIdValidation.min(1, { message: 'User ID is required' }),
    products: z.array(
      objectIdValidation.min(1, {
        message: 'At least one product ID is required',
      }),
    ),
    total_amount: z
      .number()
      .min(0, { message: 'Total amount must be a positive number' }),
    payment_method: z
      .string()
      .min(1, { message: 'Payment method is required' }),
    user_name: z.string().min(1, { message: 'User name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    order_note: z.string().optional(),
  }),
});

export const orderValidation = { orderSchema };
