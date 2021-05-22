import { FastifyPluginAsync } from 'fastify';

const plans: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/plans',
    handler: async (request) => request.payments.getAvailablePlans(),
  });
};

export default plans;
