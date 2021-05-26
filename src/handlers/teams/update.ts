import { Static, Type } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';
import { TeamParams } from './single';

export const TeamUpdatePayload = Type.Object({
  name: Type.Optional(Type.String({
    minLength: 5,
  })),
  description: Type.Optional(Type.String()),
});

export const teamUpdateHandler = async (request: FastifyRequest<{
  Params: Static<typeof TeamParams>
  Body: Static<typeof TeamUpdatePayload>
}>) => {
  const userId = request.user.id;
  const { teamId } = request.params;
  const payload = request.body;
  await prismaClient.team.updateMany({
    where: {
      userTeams: {
        some: {
          userId,
        },
      },
      id: teamId,
    },
    data: {
      name: payload.name,
      description: payload.description,
    },
  });
  return prismaClient.team.findUnique({
    where: {
      id: teamId,
    },
  });
};
