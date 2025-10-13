import { http } from './http';
import type { CreateStudentDto, UpdateStudentDto, LinkParentDto } from '../types';

export interface Student {
  id: number;
  school_id: number;
  admission_number: string;
  upi?: string;
  user_id?: number;
  date_of_birth?: string;
  gender?: string;
}

export const listStudents = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Student[]>(`students${q}`);
};

export const getStudent = (id: string) => http<Student>(`students/${id}`);
export const createStudent = (payload: CreateStudentDto) => http<Student>('students', { method: 'POST', body: JSON.stringify(payload) });
export const updateStudent = (id: string, payload: UpdateStudentDto) => http<Student>(`students/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteStudent = (id: string) => http(`students/${id}`, { method: 'DELETE' });
export const linkParent = (studentId: string | number, payload: LinkParentDto) => http(`students/${studentId}/link-parent`, { method: 'POST', body: JSON.stringify(payload) })
