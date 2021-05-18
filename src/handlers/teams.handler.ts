import { FastifyRequest } from 'fastify';
import { TeamListQueryType } from '../schemas/team';
import prismaClient from '../utils/prisma';

export const teamsListHandler = async (request: FastifyRequest<{
  Querystring: TeamListQueryType
}>) => {
  const { id: userId } = request.user;
  const { page, limit } = request.query;
  const [results, total] = await Promise.all([
    prismaClient.team.findMany({
      where: {
        userTeams: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      take: limit,
      skip: (page && page > 1) ? (page - 1) * limit : 0,
    }),
    prismaClient.team.count({
      where: {
        userTeams: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    }),
  ]);
  return {
    total, results,
  };
};
