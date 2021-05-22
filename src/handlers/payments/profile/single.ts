import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import prismaClient from '../../../utils/prisma';
import { TeamParams } from '../../teams/single';

export const paymentProfileSingleHandler = async (request: FastifyRequest<{ Params: Static<typeof TeamParams> }>) => {
  const { teamId } = request.params;
  return prismaClient.paymentProfile.findFirst({
    where: {
      teamId,
    },
  });
};
