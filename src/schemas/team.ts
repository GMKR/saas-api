import { Static, Type } from '@sinclair/typebox';

export const TeamCreatePayload = Type.Object({
  name: Type.String({
    minLength: 5,
  }),
  settings: Type.Optional(Type.Object({})),
});

export const TeamUpdatePayload = Type.Object({
  name: Type.String({
    minLength: 5,
  }),
  settings: Type.Optional(Type.Object({})),
});

export const TeamResponsePayload = Type.Object({
  id: Type.String(),
  name: Type.String(),
  isActive: Type.Boolean(),
  settings: Type.Optional(Type.Object({})),
  createdAt: Type.String({
    format: 'date-time',
  }),
  updatedAt: Type.String({
    format: 'date-time',
  }),
});

export const TeamListResponsePayload = Type.Object({
  total: Type.Number(),
  results: Type.Array(TeamResponsePayload),
});

export const TeamListQuery = Type.Object({
  page: Type.Number({
    default: 1,
  }),
  limit: Type.Number({
    default: 20,
  }),
});

const TeamParams = Type.Object({
  teamId: Type.String(),
});

export type TeamCreatePayloadType = Static<typeof TeamCreatePayload>;
export type TeamUpdatePayloadType = Static<typeof TeamUpdatePayload>;
export type TeamResponsePayloadType = Static<typeof TeamResponsePayload>;
export type TeamListResponsePayloadType = Static<typeof TeamListResponsePayload>;
export type TeamListQueryType = Static<typeof TeamListQuery>;
export type TeamParamsType = Static<typeof TeamParams>;
