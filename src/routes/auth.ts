import { FastifyPluginAsync } from 'fastify';
import { signInHandler, SignInPayload, SignInResponse } from '../handlers/auth/signin';
import { signUpHandler, SignUpPayload } from '../handlers/auth/signup';
import { useHandler } from '../utils/routes';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'POST',
    url: '/auth/signup',
    schema: {
      body: SignUpPayload,
    },
    handler: useHandler(signUpHandler),
  });
  fastify.route({
    method: 'POST',
    url: '/auth/signin',
    schema: {
      body: SignInPayload,
      response: {
        200: SignInResponse,
      },
    },
    handler: useHandler(signInHandler),
  });
};

export default example;
