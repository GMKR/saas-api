import { FastifyPluginAsync } from 'fastify';
import { profileSingleHandler } from '../handlers/profile/single';
import { useHandler } from '../utils/routes';

const profile: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/profile',
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(profileSingleHandler),
  });
};

export default profile;
