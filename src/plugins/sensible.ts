import FastifyPlugin from 'fastify-plugin';
import FastifySensible, { SensibleOptions } from 'fastify-sensible';

export default FastifyPlugin<SensibleOptions>(async (fastify) => {
  fastify.register(FastifySensible, {
    errorHandler: false,
  });
});
