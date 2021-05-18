import { compare, hash } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignInPayloadType, SignUpPayloadType, SignInResponseType } from '../schemas/auth';
import prismaClient from '../utils/prisma';

export const signUpHandler = async (request: FastifyRequest<{ Body: SignUpPayloadType }>, reply: FastifyReply) => {
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

export const signInHandler = async (request: FastifyRequest<{ Body: SignInPayloadType, Response: SignInResponseType }>, reply: FastifyReply) => {
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
