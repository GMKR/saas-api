import FastifyPlugin from 'fastify-plugin';
import FastifyRateLimit, { FastifyRateLimitOptions } from 'fastify-rate-limit';

export default FastifyPlugin<FastifyRateLimitOptions>(async (fastify) => {
  fastify.register(FastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
});
