import { http } from './http';
import type { CreateCourseDto, UpdateCourseDto } from '../types';

export interface Course {
  id: number;
  subject_id: number;
  teacher_id: number;
  title: string;
  description?: string;
  academic_year_id?: number;
}

export const listCourses = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Course[]>(`courses${q}`);
};

export const getCourse = (id: string) => http<Course>(`courses/${id}`);
export const createCourse = (payload: CreateCourseDto) => http<Course>('courses', { method: 'POST', body: JSON.stringify(payload) });
export const updateCourse = (id: string, payload: UpdateCourseDto) => http<Course>(`courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteCourse = (id: string) => http(`courses/${id}`, { method: 'DELETE' });
