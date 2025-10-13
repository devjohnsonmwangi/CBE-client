export interface CreatePlatformPaymentDto {
  amount: number;
  provider?: string;
  reference?: string;
}
