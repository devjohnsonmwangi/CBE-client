import { http } from './http';
import type { CreateInvoiceDto, CreatePaymentDto } from '../types';

export interface Invoice {
  id: number;
  student_id: number;
  term_id: number;
  amount_due: string;
  due_date: string;
}

export const listInvoices = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Invoice[]>(`invoices${q}`);
};

export const getInvoice = (id: string) => http<Invoice>(`invoices/${id}`);
export const createInvoice = (payload: CreateInvoiceDto) => http<Invoice>('invoices', { method: 'POST', body: JSON.stringify(payload) });

export const createPayment = (payload: CreatePaymentDto) => http('payments', { method: 'POST', body: JSON.stringify(payload) });
