import { FastifyPluginAsync } from 'fastify';
import { teamCreateHandler, TeamCreatePayload } from '../handlers/teams/create';
import { TeamListQuery, TeamListResponse, teamsListHandler } from '../handlers/teams/list';
import { teamRemoveHandler } from '../handlers/teams/remove';
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

  fastify.route({
    method: 'POST',
    url: '/teams',
    schema: {
      body: TeamCreatePayload,
      response: {
        200: TeamSingleResponse,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamCreateHandler),
  });

  fastify.route({
    method: 'DELETE',
    url: '/teams/:teamId',
    schema: {
      params: TeamParams,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamRemoveHandler),
  });
};

export default example;