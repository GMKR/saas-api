import { compare, hash } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { sign } from 'jsonwebtoken';
import { SignInPayloadType, SignUpPayloadType } from '../schemas/auth';
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
    return { root: true };
  }
  await prismaClient.user.create({
    data: {
      ...payload,
      password: await hash(payload.password, 10),
    },
  });
  return reply.code(204).send();
};

export const signInHandler = async (request: FastifyRequest<{ Body: SignInPayloadType }>, reply: FastifyReply) => {
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
    console.log(fetchedUser.password);
    const verified = await compare(payload.password, fetchedUser.password);
    console.log(verified);
    if (verified) {
      return sign({ sub: fetchedUser.id }, process.env.JWT_SECRET as string);
    }
  }
  return reply.unauthorized('Wrong email and password combination');
};
