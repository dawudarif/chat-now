import jwt from 'jsonwebtoken';
import { IDecoded } from '../types/types';
import { prisma } from '../prisma/prisma';


export const getUserDetails = async (token: string) => {
  const cookies = token.split('; ');
  const jwtCookie = cookies.find((cookie: string) => cookie.startsWith('jwt='));

  if (token && process.env.JWT_SECRET) {
    if (jwtCookie) {
      const jwtValue = jwtCookie.split('=')[1];
      token = jwtValue;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IDecoded;


    const findUser = await prisma.account.findUnique({
      where: {
        id: decoded?.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        username: true,
      },
    });


    return findUser
  }
}