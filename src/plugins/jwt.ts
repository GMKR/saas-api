import FastifyPlugin from 'fastify-plugin';
import FastifyJWT, { FastifyJWTOptions } from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtTokenPayload, JwtUserPayload, useUserVerify } from '../utils/user-verify';

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: JwtTokenPayload,
    user: JwtUserPayload
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: typeof useAuthenticate
  }
}

async function useAuthenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
}

export default FastifyPlugin<FastifyJWTOptions>(async (fastify) => {
  fastify.register(FastifyJWT, {
    secret: process.env.JWT_SECRET as string,
    decode: {
      complete: true,
    },
    sign: {
      issuer: process.env.JWT_ISSUER as string,
    },
    verify: {
      issuer: process.env.JWT_ISSUER as string,
    },
    trusted: useUserVerify,
  });

  fastify.decorate('authenticate', useAuthenticate);
});
