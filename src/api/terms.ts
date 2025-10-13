import { http } from './http';
import type { CreateTermDto, UpdateTermDto } from '../types';

export interface Term {
  id: number;
  academic_year_id: number;
  term_name: string;
  start_date: string;
  end_date: string;
}

export const listTerms = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Term[]>(`terms${q}`);
};

export const getTerm = (id: string) => http<Term>(`terms/${id}`);
export const createTerm = (payload: CreateTermDto) => http<Term>('terms', { method: 'POST', body: JSON.stringify(payload) });
export const updateTerm = (id: string, payload: UpdateTermDto) => http<Term>(`terms/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTerm = (id: string) => http(`terms/${id}`, { method: 'DELETE' });
