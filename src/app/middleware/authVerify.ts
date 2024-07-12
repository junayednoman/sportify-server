import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/auth/auth.model';

export const authVerify = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
      }

      const token = authHeader.split(' ')[1];

      // verify token
      const { email, role } = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      // check if user exists with the token credentials
      const isUserExist = await UserModel.findOne({ email, role });
      if (!isUserExist) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
