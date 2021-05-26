import { Static } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';
import { CheckoutCreatePayload } from '../../../@schemas/payments';
import { TeamParams } from '../../../@schemas/teams';

export const paymentCheckoutCreateHandler = async (request: FastifyRequest<{ Params: Static<typeof TeamParams>, Body: Static<typeof CheckoutCreatePayload> }>) => {
  const { teamId } = request.params;
  const payload = request.body;
  return request.payments.createCheckout(teamId, payload.planId, {
    allowPromotionCodes: false,
    successUrl: 'http://localhost:9000/stripe/webhook/success',
    cancelUrl: 'http://localhoost:9000/stripe/webhook/cancel',
  });
};
