export interface CreateInvoiceDto {
  studentId?: number;
  amount: number;
  dueDate?: string; // ISO date
  description?: string;
}

export interface UpdateInvoiceDto extends Partial<CreateInvoiceDto> {
  paid?: boolean;
}
