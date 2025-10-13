import { http } from './http';

export interface SupportTicket {
  id: number;
  title: string;
  status?: string;
}

export const listSupportTickets = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<SupportTicket[]>(`support-tickets${q}`);
};

export const getSupportTicket = (id: string) => http<SupportTicket>(`support-tickets/${id}`);
export const createSupportTicket = (payload: any) => http<SupportTicket>('support-tickets', { method: 'POST', body: JSON.stringify(payload) });
export const updateSupportTicket = (id: string, payload: any) => http<SupportTicket>(`support-tickets/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteSupportTicket = (id: string) => http(`support-tickets/${id}`, { method: 'DELETE' });
