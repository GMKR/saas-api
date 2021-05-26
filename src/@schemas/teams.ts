import { Type } from '@sinclair/typebox';

export const TeamCreatePayload = Type.Object({
  name: Type.String({
    minLength: 5,
  }),
  roleId: Type.String(),
});

export const TeamListQuery = Type.Object({
  page: Type.Number({
    default: 1,
  }),
  limit: Type.Number({
    default: 20,
  }),
});

export const TeamParams = Type.Object({
  teamId: Type.String(),
});

export const Team = Type.Object({
  id: Type.String(),
  name: Type.String(),
  isActive: Type.Boolean(),
  settings: Type.Optional(Type.Object({})),
  description: Type.Optional(Type.String()),
  createdAt: Type.String({
    format: 'date-time',
  }),
  updatedAt: Type.String({
    format: 'date-time',
  }),
});

export const TeamPaginatedList = Type.Object({
  total: Type.Number(),
  results: Type.Array(Team),
});
