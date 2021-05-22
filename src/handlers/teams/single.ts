import { Static, Type } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { messages } from '../../messages/en';
import prismaClient from '../../utils/prisma';

export const TeamParams = Type.Object({
  teamId: Type.String(),
});

export const TeamSingleResponse = Type.Object({
  id: Type.String(),
  name: Type.String(),
  isActive: Type.Boolean(),
  settings: Type.Optional(Type.Object({})),
  createdAt: Type.String({
    format: 'date-time',
  }),
  updatedAt: Type.String({
    format: 'date-time',
  }),
});

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
