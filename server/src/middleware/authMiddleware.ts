import { NextFunction, Request, Response } from 'express';
import { getUserDetails } from '../utils/getUserDetails';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  token = await req.headers.cookie;

  if (token && process.env.JWT_SECRET) {
    try {
      const findUser = await getUserDetails(token)
      req.user = findUser;

      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export { protect };

