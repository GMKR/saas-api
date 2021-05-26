import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { TeamParams } from '../../@schemas/teams';
import prismaClient from '../../utils/prisma';

export const teamRemoveHandler = async (request: FastifyRequest<{
  Params: Static<typeof TeamParams>
}>) => {
  const { id: userId } = request.user;
  const { teamId } = request.params;
  return prismaClient.team.deleteMany({
    where: {
      id: teamId,
      userTeams: {
        some: {
          userId,
        },
      },
    },
  });
};
