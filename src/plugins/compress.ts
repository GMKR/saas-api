import FastifyPlugin from 'fastify-plugin';
import FastifyCompress, { FastifyCompressOptions } from 'fastify-compress';
import zlib from 'zlib';

export default FastifyPlugin<FastifyCompressOptions>(async (fastify) => {
  fastify.register(FastifyCompress, {
    global: true,
    brotliOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
      },
    },
  });
});
