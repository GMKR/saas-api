import { Static, Type } from '@sinclair/typebox';

export const SignInPayload = Type.Object({
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 40,
  }),
});

export const SignUpPayload = Type.Object({
  firstName: Type.String({
    maxLength: 40,
  }),
  lastName: Type.String({
    maxLength: 40,
  }),
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 40,
  }),
});

export const SignInResponse = Type.Object({
  token: Type.String(),
});

export type SignInPayloadType = Static<typeof SignInPayload>;
export type SignUpPayloadType = Static<typeof SignUpPayload>;
export type SignInResponseType = Static<typeof SignInResponse>;
