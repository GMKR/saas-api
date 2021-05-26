import { FastifyPluginAsync } from 'fastify';
import { CheckoutCreatePayload } from '../@schemas/payments';
import {
  Team, TeamCreatePayload, TeamListQuery, TeamPaginatedList, TeamParams,
} from '../@schemas/teams';
import { paymentCheckoutCreateHandler } from '../handlers/payments/checkout/create';
import { paymentPlanListHandler } from '../handlers/payments/plans/list';
import { paymentProfileSingleHandler } from '../handlers/payments/profile/single';
import { paymentSubscriptionsList } from '../handlers/payments/subscriptions/list';
import { teamCreateHandler } from '../handlers/teams/create';
import { teamsListHandler } from '../handlers/teams/list';
import { teamRemoveHandler } from '../handlers/teams/remove';
import { teamSingleHandler } from '../handlers/teams/single';
import { teamUpdateHandler, TeamUpdatePayload } from '../handlers/teams/update';
import { useHandler } from '../utils/routes';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/teams',
    schema: {
      querystring: TeamListQuery,
      response: {
        200: TeamPaginatedList,
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
        200: Team,
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
        200: Team,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamCreateHandler),
  });

  fastify.route({
    method: 'PATCH',
    url: '/teams/:teamId',
    schema: {
      params: TeamParams,
      body: TeamUpdatePayload,
      response: {
        200: Team,
      },
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(teamUpdateHandler),
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

  fastify.route({
    method: 'GET',
    url: '/teams/:teamId/payment-profile',
    schema: {
      params: TeamParams,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(paymentProfileSingleHandler),
  });

  fastify.route({
    method: 'GET',
    url: '/teams/:teamId/payment-subscriptions',
    schema: {
      params: TeamParams,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(paymentSubscriptionsList),
  });

  fastify.route({
    method: 'GET',
    url: '/teams/:teamId/payment-plans',
    schema: {
      params: TeamParams,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(paymentPlanListHandler),
  });

  fastify.route({
    method: 'POST',
    url: '/teams/:teamId/payment-checkout',
    schema: {
      params: TeamParams,
      body: CheckoutCreatePayload,
    },
    preValidation: [
      fastify.authenticate,
    ],
    handler: useHandler(paymentCheckoutCreateHandler),
  });
};

export default example;
