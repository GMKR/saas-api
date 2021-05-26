import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { TeamParams } from '../../../@schemas/teams';

export const paymentPlanListHandler = async (request: FastifyRequest<{ Params: Static<typeof TeamParams> }>) => {
  const { teamId } = request.params;
  return request.payments.getAvailablePlans(teamId);
};
