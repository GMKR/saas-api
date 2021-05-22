import FastifyPlugin from 'fastify-plugin';
import FastifyCompress, { FastifyCompressOptions } from 'fastify-compress';

export default FastifyPlugin<FastifyCompressOptions>(async (fastify) => {
  fastify.register(FastifyCompress, {
    global: true,
  });
});
