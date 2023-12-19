import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (res: Response, userId: String) => {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
};
