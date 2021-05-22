export interface CreateCheckoutConfig {
  allowPromotionCodes: boolean
  successUrl: string
  cancelUrl: string
  customer?: string
  teamId: string
}
