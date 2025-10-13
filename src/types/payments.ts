export interface CreatePaymentDto {
  amount: number;
  method?: string;
  reference?: string;
  invoiceId?: number;
}
