import { http } from './http';
import type { CreateLessonContentDto, UpdateLessonContentDto, MarkProgressDto } from '../types';

export interface LessonContent {
  id: number;
  module_id: number;
  title: string;
  content_type: string;
}

export const listLessonContents = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<LessonContent[]>(`lesson-contents${q}`);
};

export const getLessonContent = (id: string) => http<LessonContent>(`lesson-contents/${id}`);
export const createLessonContent = (payload: CreateLessonContentDto) => http<LessonContent>('lesson-contents', { method: 'POST', body: JSON.stringify(payload) });
export const updateLessonContent = (id: string, payload: UpdateLessonContentDto) => http<LessonContent>(`lesson-contents/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteLessonContent = (id: string) => http(`lesson-contents/${id}`, { method: 'DELETE' });
export const markProgress = (id: string, payload: MarkProgressDto) => http(`lesson-contents/${id}/progress`, { method: 'POST', body: JSON.stringify(payload) });
