import Stripe from 'stripe';

export interface CreateCheckoutConfig {
  allowPromotionCodes: boolean
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
  successUrl: string
  cancelUrl: string
  customer?: string
  teamId: string
}
