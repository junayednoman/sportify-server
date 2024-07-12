import { Router } from 'express';
import { UserControllers } from './auth.controller';
import { authValidations } from './auth.validations';
import { validateDataByZod } from '../../middleware/validateDataByZod';

const authRouter = Router();
const userRouter = Router();
authRouter.post(
  '/sign-up',
  validateDataByZod(authValidations.createUserValidationSchema),
  UserControllers.createUser,
);

authRouter.post(
  '/login',
  validateDataByZod(authValidations.loginUserValidationSchema),
  UserControllers.loginUser,
);

export const AuthRoutes = { authRouter, userRouter };
