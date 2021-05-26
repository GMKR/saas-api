import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { TeamCreatePayload } from '../../@schemas/teams';
import prismaClient from '../../utils/prisma';

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
