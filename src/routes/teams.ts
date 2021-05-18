import { FastifyPluginAsync } from 'fastify';
import { TeamListQuery, TeamListResponse, teamsListHandler } from '../handlers/teams/list';
import { TeamParams, teamSingleHandler, TeamSingleResponse } from '../handlers/teams/single';
import { useHandler } from '../utils/routes';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/teams',
    schema: {
      querystring: TeamListQuery,
      response: {
        200: TeamListResponse,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamsListHandler),
  });

  fastify.route({
    method: 'GET',
    url: '/teams/:teamId',
    schema: {
      params: TeamParams,
      response: {
        200: TeamSingleResponse,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamSingleHandler),
  });
};

export default example;
