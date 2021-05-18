import { FastifyPluginAsync } from 'fastify';
import { signInHandler, signUpHandler } from '../handlers/auth.handler';
import { useHandler } from '../utils/routes';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/auth/signup', useHandler(signUpHandler));
  fastify.post('/auth/signin', useHandler(signInHandler));
};

export default example;
