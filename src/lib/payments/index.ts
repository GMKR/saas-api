import { PaymentGateway } from '.prisma/client';
import prismaClient from '../../utils/prisma';
import { CreateCheckoutConfig } from './interfaces';
import { StripeGatewayConfig, StripePayments } from './stripe';

export default class Payments {
  private IPaymentGateway: StripePayments;

  constructor(provider: PaymentGateway, config: StripeGatewayConfig) {
    if (provider === 'STRIPE') {
      this.IPaymentGateway = new StripePayments(config);
    }
    throw new Error('Unknown payment gateway');
  }

  async getProfile(teamId: string) {
    return prismaClient.paymentProfile.findFirst({
      where: {
        teamId,
        gateway: this.IPaymentGateway.name,
      },
    });
  }

  async getSubscriptions(teamId: string) {
    return prismaClient.paymentSubscription.findMany({
      where: {
        teamId,
      },
    });
  }

  async createCheckout(teamId: string, config: CreateCheckoutConfig) {
    const gatewayConfig = config;
    const existingProfile = await prismaClient.paymentProfile.findFirst({
      where: {
        teamId,
      },
      select: {
        gatewayId: true,
      },
    });
    if (existingProfile) {
      gatewayConfig.customer = existingProfile.gatewayId;
    }
    gatewayConfig.teamId = teamId;
    return this.IPaymentGateway.createCheckout(gatewayConfig);
  }
}
