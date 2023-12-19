import { PrismaClient } from '@prisma/client';
import { getTokenFromCookie } from './extractToken';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUser = async (cookie: string, prisma: PrismaClient) => {
  const token = getTokenFromCookie('jwt', cookie);
  if (token && process.env.JWT_SECRET) {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET,
    )) as JwtPayload;
    const findUser = await prisma.account.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return findUser;
  }
};
