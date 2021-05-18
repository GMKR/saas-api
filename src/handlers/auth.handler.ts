import { compare } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { sign } from 'jsonwebtoken';
import prismaClient from '../utils/prisma';

export interface UserSignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}
export interface UserSignInPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export const signUpHandler = async (request: FastifyRequest<{ Body: UserSignUpPayload }>, reply: FastifyReply) => {
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
    return { root: true };
  }
  await prismaClient.user.create({
    data: {
      ...payload,
    },
  });
  return reply.code(204).send();
};

export const signInHandler = async (request: FastifyRequest<{ Body: UserSignInPayload }>, reply: FastifyReply) => {
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
      return sign({ sub: fetchedUser.id }, process.env.JWT_SECRET as string);
    }
  }
  return reply.unauthorized('Wrong email and password combination');
};
