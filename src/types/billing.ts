export interface CreateInvoiceDto {
  student_id: number;
  term_id: number;
  amount_due: string; // decimal string
  due_date: string; // YYYY-MM-DD
  notes?: string;
}

export interface CreatePaymentDto {
  // Minimal placeholder — backend file was empty
  invoice_id?: number;
  amount?: string;
}
