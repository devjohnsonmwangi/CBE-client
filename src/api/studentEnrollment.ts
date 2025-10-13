import { http } from './http';
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from '../types';

export interface Enrollment {
  id: number;
  student_id: number;
  class_id: number;
}

export const listEnrollments = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Enrollment[]>(`student-enrollment${q}`);
};

export const getEnrollment = (id: string) => http<Enrollment>(`student-enrollment/${id}`);
export const createEnrollment = (payload: CreateEnrollmentDto) => http<Enrollment>('student-enrollment', { method: 'POST', body: JSON.stringify(payload) });
export const updateEnrollment = (id: string, payload: UpdateEnrollmentDto) => http<Enrollment>(`student-enrollment/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteEnrollment = (id: string) => http(`student-enrollment/${id}`, { method: 'DELETE' });
