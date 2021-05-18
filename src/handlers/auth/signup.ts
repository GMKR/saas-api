import { Static, Type } from '@sinclair/typebox';
import { hash } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';

export const SignUpPayload = Type.Object({
  firstName: Type.String({
    maxLength: 40,
  }),
  lastName: Type.String({
    maxLength: 40,
  }),
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 40,
  }),
});

export const signUpHandler = async (request: FastifyRequest<{ Body: Static<typeof SignUpPayload> }>, reply: FastifyReply) => {
  const payload = request.body;
  const existingUser = await prismaClient.user.findFirst({
    where: {
      email: payload.email,
      isActive: true,
      isVerified: true,
    },
    select: {
      id: true,
    },
  });
  if (existingUser) {
    return reply.conflict('User account with same email already exists');
  }
  await prismaClient.user.create({
    data: {
      ...payload,
      password: await hash(payload.password, 10),
    },
  });
  return reply.code(204).send();
};
