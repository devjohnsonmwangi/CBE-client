import { http } from './http';
import type { CreateSubjectDto, UpdateSubjectDto } from '../types';

export interface Subject {
  id: number;
  school_id: number;
  subject_name: string;
  subject_code?: string;
}

export const listSubjects = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Subject[]>(`subjects${q}`);
};

export const getSubject = (id: string) => http<Subject>(`subjects/${id}`);
export const createSubject = (payload: CreateSubjectDto) => http<Subject>('subjects', { method: 'POST', body: JSON.stringify(payload) });
export const updateSubject = (id: string, payload: UpdateSubjectDto) => http<Subject>(`subjects/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteSubject = (id: string) => http(`subjects/${id}`, { method: 'DELETE' });
