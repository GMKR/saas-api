import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DateTime } from 'luxon';
import { ForgotPasswordPayload } from '../../@schemas/auth';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const forgotPasswordHandler = async (request: FastifyRequest<{ Body: Static<typeof ForgotPasswordPayload> }>, reply: FastifyReply) => {
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
          type: 'resetPassword',
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
  if (fetchedUser) {
    if (fetchedUser.userkeys && fetchedUser.userkeys.length > 0) {
      return reply.badRequest(messages.FORGOTPASSWORD_WAIT);
    }
    const insertedKey = await prismaClient.userKey.create({
      data: {
        type: 'forgotPassword',
        key: '',
        user: {
          connect: {
            id: fetchedUser.id,
          },
        },
        expiresAt: DateTime.now().plus({ minutes: 5 }).toJSDate(),
      },
    });
    // eslint-disable-next-line no-console
    console.log(insertedKey);
    // TODO: Send email to user from here
  }
  return {
    message: messages.FORGOTPASSWORD_SUCCESS,
  };
};
