import FastifyPlugin from 'fastify-plugin';
import Payments from '../lib/payments';

declare module 'fastify' {
  interface FastifyInstance {
    payments: typeof Payments
  }
  interface FastifyRequest {
    payments: Payments
  }
}
const payments = new Payments('STRIPE', { apiKey: process.env.STRIPE_KEY as string });

export default FastifyPlugin(async (fastify) => {
  fastify.decorate('payments', {
    getter: () => payments,
  });
  fastify.decorateRequest('payments', {
    getter: () => payments,
  });
});
