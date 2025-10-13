export interface CreatePlatformInvoiceDto {
  amount: number;
  description?: string;
  metadata?: Record<string, any>;
}

export interface UpdatePlatformInvoiceDto extends Partial<CreatePlatformInvoiceDto> {
  paid?: boolean;
}
