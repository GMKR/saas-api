import { Type } from '@sinclair/typebox';

export const ProfileUpdatePayload = Type.Object({
  firstName: Type.Optional(Type.String({
    minLength: 3,
  })),
  lastName: Type.Optional(Type.String({
    minLength: 1,
  })),
  email: Type.Optional(Type.String({
    format: 'email',
  })),
  password: Type.Optional(Type.String({
    minLength: 8,
  })),
});

export const User = Type.Object({
  id: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({
    format: 'email',
  }),
  isVerified: Type.Boolean(),
  settings: Type.Object({}),
  picture: Type.String(),
});
