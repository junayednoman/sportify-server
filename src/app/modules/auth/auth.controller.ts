import { UserServices } from './auth.service';
import successResponse from '../../utils/successResponse';
import catchAsyncError from '../../utils/catchAsyncError';

const createUser = catchAsyncError(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDb(userData);
  result.password = '';
  successResponse(res, {
    message: 'User registered successfully!',
    status: 201,
    data: result,
  });
});

const loginUser = catchAsyncError(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.loginUser(userData);
  const { accessToken, user } = result;
  user.password = '';
  successResponse(
    res,
    {
      message: 'User logged in successfully!',
      data: user,
    },
    accessToken,
  );
});

export const UserControllers = {
  createUser,
  loginUser,
};
