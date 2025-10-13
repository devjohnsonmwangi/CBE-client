import { http } from './http';
import type { CreateAssessmentDto, UpdateAssessmentDto } from '../types';

export interface Assessment {
  id: number;
  term_id: number;
  student_id: number;
  subject_id: number;
  teacher_id: number;
  assessment_type: string;
  assessment_title?: string;
  strand?: string;
  sub_strand?: string;
  learning_outcome?: string;
  performance_level?: string;
  score?: string;
  teacher_comments?: string;
  assessment_date?: string;
}

export const listAssessments = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Assessment[]>(`assessments${q}`);
};

export const getAssessment = (id: string) => http<Assessment>(`assessments/${id}`);
export const createAssessment = (payload: CreateAssessmentDto) => http<Assessment>('assessments', { method: 'POST', body: JSON.stringify(payload) });
export const updateAssessment = (id: string, payload: UpdateAssessmentDto) => http<Assessment>(`assessments/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteAssessment = (id: string) => http(`assessments/${id}`, { method: 'DELETE' });
