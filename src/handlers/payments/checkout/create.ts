import { Static, Type } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { TeamParams } from '../../teams/single';

const CheckoutCreatePayload = Type.Object({
  planId: Type.String(),
});

export const paymentCheckoutCreateHandler = async (request: FastifyRequest<{ Params: Static<typeof TeamParams>, Body: Static<typeof CheckoutCreatePayload> }>) => {
  const { teamId } = request.params;
  const payload = request.body;
  return request.payments.createCheckout(teamId, payload.planId, {
    allowPromotionCodes: false,
    successUrl: '///',
    cancelUrl: '///',
  });
};
