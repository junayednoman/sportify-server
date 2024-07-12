import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }),
    password: z
      .string({ required_error: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    image: z.string({ required_error: 'Image is required!' }),
    // role: z.enum(['user']),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const authValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
