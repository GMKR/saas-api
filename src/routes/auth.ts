import { FastifyPluginAsync } from 'fastify';
import { signInHandler, signUpHandler } from '../handlers/auth.handler';
import { useHandler } from '../utils/routes';
import { SignUpPayload, SignInPayload } from '../schemas/auth';

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
    },
    handler: useHandler(signInHandler),
  });
};

export default example;
