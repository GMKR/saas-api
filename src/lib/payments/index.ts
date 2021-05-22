import { PaymentGateway } from '.prisma/client';
import { messages } from '../../messages/en';
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

  async getPlan(teamId: string) {
    return prismaClient.paymentSubscription.findFirst({
      where: {
        teamId,
      },
    }).plan();
  }

  async createCheckout(teamId: string, planId: string, config: CreateCheckoutConfig) {
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
    const fetchedPlan = await prismaClient.paymentPlan.findUnique({
      where: {
        id: planId,
      },
      select: {
        gatewayId: true,
      },
    });
    if (!fetchedPlan) {
      throw new Error(messages.PLAN_NOTFOUND);
    }
    return this.IPaymentGateway.createCheckout(fetchedPlan.gatewayId, gatewayConfig);
  }

  async getAvailablePlans(teamId: string) {
    return prismaClient.paymentPlan.findMany({
      where: {
        isActive: true,
        OR: [
          {
            teamId,
          },
          {
            teamId: null,
          },
        ],
      },
    });
  }
}
