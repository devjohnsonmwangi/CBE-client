import { http } from './http';
import type { CreateAssignmentDto, UpdateAssignmentDto } from '../types';

export interface Assignment {
  id: number;
  content_id: number;
  instructions: string;
  due_date?: string;
  max_points?: number;
}

export const listAssignments = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Assignment[]>(`assignments${q}`);
};

export const getAssignment = (id: string) => http<Assignment>(`assignments/${id}`);
export const createAssignment = (payload: CreateAssignmentDto) => http<Assignment>('assignments', { method: 'POST', body: JSON.stringify(payload) });
export const updateAssignment = (id: string, payload: UpdateAssignmentDto) => http<Assignment>(`assignments/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteAssignment = (id: string) => http(`assignments/${id}`, { method: 'DELETE' });
