import { Type } from '@sinclair/typebox';

export const CheckoutCreatePayload = Type.Object({
  planId: Type.String(),
});
