import { Static, Type } from '@sinclair/typebox';
import { compare } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';

export const SignInPayload = Type.Object({
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 40,
  }),
});

export const SignInResponse = Type.Object({
  token: Type.String(),
});

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
      };
    }
  }
  return reply.unauthorized('Wrong email and password combination');
};
