import { http } from './http';
import type { CreateSubjectRequirementDto, UpdateSubjectRequirementDto } from '../types';

export interface SubjectRequirement {
  id: number;
  term_id: number;
}

export const listSubjectRequirements = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<SubjectRequirement[]>(`subject-requirements${q}`);
};

export const getSubjectRequirement = (id: string) => http<SubjectRequirement>(`subject-requirements/${id}`);
export const createSubjectRequirement = (payload: CreateSubjectRequirementDto) => http<SubjectRequirement>('subject-requirements', { method: 'POST', body: JSON.stringify(payload) });
export const updateSubjectRequirement = (id: string, payload: UpdateSubjectRequirementDto) => http<SubjectRequirement>(`subject-requirements/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteSubjectRequirement = (id: string) => http(`subject-requirements/${id}`, { method: 'DELETE' });
