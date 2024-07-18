import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TLoginUser, TUser } from './auth.interface';
import { UserModel } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

// create service for creating user into db
const createUserIntoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

// login user
const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );
  // check if a user exist with the email
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email!', 'email');
  }

  // check if password match
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  // generate jwt access token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    id: user?.id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return { accessToken, user };
};

export const UserServices = {
  createUserIntoDb,
  loginUser,
};
