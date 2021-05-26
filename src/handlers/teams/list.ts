import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { TeamListQuery } from '../../@schemas/teams';
import prismaClient from '../../utils/prisma';

export const teamsListHandler = async (request: FastifyRequest<{
  Querystring: Static<typeof TeamListQuery>
}>) => {
  const { id: userId } = request.user;
  const { page, limit } = request.query;
  const [results, total] = await Promise.all([
    prismaClient.team.findMany({
      where: {
        userTeams: {
          some: {
            userId,
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
            userId,
          },
        },
      },
    }),
  ]);
  return {
    total, results,
  };
};
