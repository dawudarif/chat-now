import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const errorMessage = isProduction
    ? 'Something went wrong. Please try again later.'
    : err.message;

  res.status(err.status || 500).send(errorMessage);
};
