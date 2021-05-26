import { Static } from '@sinclair/typebox';
import { compare } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignInPayload, SignInResponse } from '../../@schemas/auth';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const signInHandler = async (request: FastifyRequest<{ Body: Static<typeof SignInPayload>, Response: Static<typeof SignInResponse> }>, reply: FastifyReply) => {
  const payload = request.body;
  const fetchedUser = await prismaClient.user.findFirst({
    where: {
      email: payload.email,
      isActive: true,
    },
    select: {
      id: true,
      password: true,
      isVerified: true,
    },
  });
  if (fetchedUser) {
    const verified = await compare(payload.password, fetchedUser.password);
    if (verified) {
      return {
        token: await reply.jwtSign({ id: fetchedUser.id }),
        id: fetchedUser.id,
      };
    }
  }
  return reply.unauthorized(messages.USER_INVALID_CREDENTIALS);
};
