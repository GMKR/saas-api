import { FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';

export const profileSingleHandler = async (request: FastifyRequest) => {
  const userId = request.user.id;
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isVerified: true,
      settings: true,
      picture: true,
    },
  });
};
