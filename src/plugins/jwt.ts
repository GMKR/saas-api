import FastifyPlugin from 'fastify-plugin';
import FastifyJWT, { FastifyJWTOptions } from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import prismaClient from '../utils/prisma';

interface JwtUserPayload {
  id: string
}
interface JwtTokenPayload {
  id: string
}

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

async function useUserVerify(_request: FastifyRequest, decodedToken: any) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: decodedToken.id,
      isActive: true,
      isVerified: true,
    },
    select: {
      id: true,
    },
  });
  return user as JwtUserPayload;
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
