import { Type } from '@sinclair/typebox';

export const SignInPayload = Type.Object({
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
  id: Type.String(),
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

export const SignUpResponse = Type.Object({
  id: Type.String(),
});

export const ResetPasswordPayload = Type.Object({
  email: Type.String({
    format: 'email',
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 35,
  }),
  key: Type.String(),
});

export const ForgotPasswordPayload = Type.Object({
  email: Type.String({
    format: 'email',
  }),
});
