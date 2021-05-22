import Stripe from 'stripe';
import { PaymentGateway } from '.prisma/client';
import { CreateCheckoutConfig } from '../interfaces';

export interface StripeGatewayConfig {
  apiKey: string
}

export class StripePayments {
  public name: PaymentGateway = 'STRIPE';

  private StripeClient;

  constructor(config: StripeGatewayConfig) {
    this.StripeClient = new Stripe(config.apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  createCheckout(config: CreateCheckoutConfig) {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      allow_promotion_codes: config.allowPromotionCodes,
      cancel_url: config.cancelUrl,
      success_url: config.successUrl,
      line_items: config.lineItems,
    };
    return this.StripeClient.checkout.sessions.create(params);
  }

  getCustomer(id: string) {
    return this.StripeClient.customers.retrieve(id);
  }

  getCustomerSubscriptions(customerId: string) {
    return this.StripeClient.subscriptions.list({
      customer: customerId,
    });
  }

  getSubscription(id: string) {
    return this.StripeClient.subscriptions.retrieve(id);
  }
}
