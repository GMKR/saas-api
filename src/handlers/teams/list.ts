import { Static, Type } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import prismaClient from '../../utils/prisma';
import { TeamSingleResponse } from './single';

export const TeamListQuery = Type.Object({
  page: Type.Number({
    default: 1,
  }),
  limit: Type.Number({
    default: 20,
  }),
});

export const TeamListResponse = Type.Object({
  total: Type.Number(),
  results: Type.Array(TeamSingleResponse),
});

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
