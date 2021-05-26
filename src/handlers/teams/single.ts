import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { TeamParams } from '../../@schemas/teams';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const teamSingleHandler = async (request: FastifyRequest<{
  Params: Static<typeof TeamParams>
}>, reply: FastifyReply) => {
  const { id: userId } = request.user;
  const { teamId } = request.params;
  const fetchedTeam = await prismaClient.team.findFirst({
    where: {
      userTeams: {
        some: {
          userId,
        },
      },
      id: teamId,
    },
  });
  if (fetchedTeam) {
    return fetchedTeam;
  }
  return reply.notFound(messages.TEAM_NOT_FOUND);
};
