import FastifyPlugin from 'fastify-plugin';
import FastifyAuth from 'fastify-auth';

export default FastifyPlugin(async (fastify) => {
  fastify.register(FastifyAuth);
});
