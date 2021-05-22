import { Static, Type } from '@sinclair/typebox';
import { hash } from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const ResetPasswordPayload = Type.Object({
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 35,
  }),
  key: Type.String(),
});

export const resetPasswordHandler = async (request: FastifyRequest<{ Body: Static<typeof ResetPasswordPayload> }>, reply: FastifyReply) => {
  const payload = request.body;
  const fetchedUser = await prismaClient.user.findFirst({
    where: {
      email: payload.email,
      isActive: true,
    },
    select: {
      id: true,
      userkeys: {
        where: {
          type: 'forgotPassword',
          key: payload.key,
          expiresAt: {
            lte: new Date(),
          },
        },
        select: {
          id: true,
        },
        take: 1,
      },
    },
  });
  if (fetchedUser && fetchedUser.userkeys && fetchedUser.userkeys.length > 0) {
    await prismaClient.user.update({
      where: {
        id: fetchedUser.id,
      },
      data: {
        isVerified: true,
        password: await hash(payload.password, 10),
        userkeys: {
          delete: {
            id: fetchedUser.userkeys[0].id,
          },
        },
      },
    });
    return {
      message: messages.RESETPASSWORD_SUCCESS,
    };
  }
  return reply.badRequest(messages.RESETPASSWORD_ERROR);
};
