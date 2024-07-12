/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

const handleDataNotFound = (result: any, res: Response) => {
  if (!result || result.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
};
export default handleDataNotFound;
