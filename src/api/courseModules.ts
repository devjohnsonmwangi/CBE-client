import { http } from './http';
import type { CreateCourseModuleDto, UpdateCourseModuleDto } from '../types';

export interface CourseModule {
  id: number;
  course_id: number;
  title: string;
}

export const listCourseModules = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<CourseModule[]>(`course-modules${q}`);
};

export const getCourseModule = (id: string) => http<CourseModule>(`course-modules/${id}`);
export const createCourseModule = (payload: CreateCourseModuleDto) => http<CourseModule>('course-modules', { method: 'POST', body: JSON.stringify(payload) });
export const updateCourseModule = (id: string, payload: UpdateCourseModuleDto) => http<CourseModule>(`course-modules/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteCourseModule = (id: string) => http(`course-modules/${id}`, { method: 'DELETE' });
