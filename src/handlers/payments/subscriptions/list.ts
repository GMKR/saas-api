import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import prismaClient from '../../../utils/prisma';
import { TeamParams } from '../../teams/single';

export const paymentSubscriptionsList = async (request: FastifyRequest<{ Params: Static<typeof TeamParams> }>) => {
  const { teamId } = request.params;
  const [results, total] = await Promise.all([
    prismaClient.paymentSubscription.findMany({
      where: {
        teamId,
      },
    }),
    prismaClient.paymentSubscription.count({
      where: {
        teamId,
      },
    }),
  ]);
  return { results, total };
};
