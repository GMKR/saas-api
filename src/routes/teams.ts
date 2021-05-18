import { FastifyPluginAsync } from 'fastify';
import { teamsListHandler } from '../handlers/teams.handler';
import { TeamListQuery, TeamListResponsePayload } from '../schemas/team';
import { useHandler } from '../utils/routes';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/teams',
    schema: {
      querystring: TeamListQuery,
      response: {
        200: TeamListResponsePayload,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamsListHandler),
  });
};

export default example;
