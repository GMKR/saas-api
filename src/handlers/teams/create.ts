import { Static, Type } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';

export const TeamCreatePayload = Type.Object({
  name: Type.String({
    minLength: 5,
  }),
  roleId: Type.String(),
});

export const teamCreateHandler = async (request: FastifyRequest<{
  Body: Static<typeof TeamCreatePayload>
}>) => {
  const { id: userId } = request.user;
  const payload = request.body;
  return prismaClient.team.create({
    data: {
      name: payload.name,
      userTeams: {
        create: {
          user: {
            connect: {
              id: userId,
            },
          },
          role: {
            connect: {
              id: payload.roleId,
            },
          },
        },
      },
    },
  });
};
