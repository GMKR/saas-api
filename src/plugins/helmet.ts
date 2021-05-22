import FastifyPlugin from 'fastify-plugin';
import FastifyHelmet from 'fastify-helmet';

export default FastifyPlugin(async (fastify) => {
  fastify.register(FastifyHelmet);
});
