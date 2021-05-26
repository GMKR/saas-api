import { FastifyPluginAsync } from 'fastify';
import { ProfileUpdatePayload } from '../@schemas/user';
import { profileSingleHandler } from '../handlers/profile/single';
import { profileUpdateHandler } from '../handlers/profile/update';
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

  fastify.route({
    method: 'PATCH',
    url: '/profile',
    schema: {
      body: ProfileUpdatePayload,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(profileUpdateHandler),
  });
};

export default profile;
