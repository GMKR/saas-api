import { FastifyRequest } from 'fastify';
import prismaClient from './prisma';

export interface JwtUserPayload {
  id: string
}

export interface JwtTokenPayload {
  id: string
}

export async function useUserVerify(_request: FastifyRequest, decodedToken: any) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: decodedToken.id,
      isActive: true,
      isVerified: true,
    },
    select: {
      id: true,
    },
  });
  return user as JwtUserPayload;
}
