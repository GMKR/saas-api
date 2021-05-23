import { FastifyPluginAsync } from 'fastify';
import { forgotPasswordHandler, ForgotPasswordPayload } from '../handlers/auth/forgot.handler';
import { resetPasswordHandler, ResetPasswordPayload } from '../handlers/auth/reset.handler';
import { signInHandler, SignInPayload, SignInResponse } from '../handlers/auth/signin.handler';
import { signUpHandler, SignUpPayload } from '../handlers/auth/signup.handler';
import { useHandler } from '../utils/routes';

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
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

  fastify.route({
    method: 'POST',
    url: '/auth/forgot-password',
    schema: {
      body: ForgotPasswordPayload,
    },
    handler: useHandler(forgotPasswordHandler),
  });

  fastify.route({
    method: 'POST',
    url: '/auth/reset-password',
    schema: {
      body: ResetPasswordPayload,
    },
    handler: useHandler(resetPasswordHandler),
  });

  fastify.route({
    method: 'GET',
    url: '/me',
    preValidation: [
      fastify.authenticate,
    ],
    handler: async (request) => request.user,
  });
};

export default auth;
