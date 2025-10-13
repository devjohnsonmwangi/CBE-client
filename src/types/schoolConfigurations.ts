export interface MpesaCredentialsDto {
  consumerKey: string;
  consumerSecret: string;
  passKey: string;
  shortCode: string;
  environment: 'sandbox' | 'live';
}

export interface StripeCredentialsDto {
  secretKey: string;
  webhookSecret: string;
}

export interface UpdateConfigurationDto {
  mpesa_credentials?: MpesaCredentialsDto;
  stripe_credentials?: StripeCredentialsDto;
  default_payment_gateway?: string;
}
