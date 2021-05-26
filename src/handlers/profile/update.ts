import { Static } from '@sinclair/typebox';
import { hash } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ProfileUpdatePayload } from '../../@schemas/user';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const profileUpdateHandler = async (request: FastifyRequest<{ Body: Static<typeof ProfileUpdatePayload> }>, reply: FastifyReply) => {
  const userId = request.user.id;
  const payload = request.body;
  if (payload.email) {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: payload.email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });
    if (existingUser) {
      return reply.conflict(messages.USER_CONFLICT_ERROR);
    }
  }
  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      ...payload,
      password: payload.password ? await hash(payload.password, 10) : undefined,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      isVerified: true,
      settings: true,
      picture: true,
    },
  });
};
