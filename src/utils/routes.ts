import { FastifyReply, FastifyRequest } from 'fastify';

export const useHandler = (fn: Function) => (request: FastifyRequest, reply: FastifyReply) => Promise.resolve(fn(request, reply)).catch((err) => {
  request.log.error(err);
  return reply.internalServerError();
});
