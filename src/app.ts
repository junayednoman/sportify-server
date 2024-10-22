/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/utils/notFound';

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(cookieParser());

// const test = async (req: Request, res: Response) => {
//   Promise.reject();
// };

// app.get('/', test);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Front-end Developer 👋!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
