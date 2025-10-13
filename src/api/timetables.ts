import { http } from './http';
import type { CreateTimetableVersionDto, CreateLessonDto } from '../types';

export interface Timetable {
  id: number;
  school_id?: number;
}

export const listTimetables = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Timetable[]>(`timetables${q}`);
};

export const getTimetable = (id: string) => http<Timetable>(`timetables/${id}`);
export const createTimetable = (payload: CreateTimetableVersionDto) => http<Timetable>('timetables', { method: 'POST', body: JSON.stringify(payload) });
export const updateTimetable = (id: string, payload: Partial<CreateTimetableVersionDto>) => http<Timetable>(`timetables/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTimetable = (id: string) => http(`timetables/${id}`, { method: 'DELETE' });

// Timetable lessons management (backend exposes add/remove lesson endpoints)
export const addLesson = (payload: CreateLessonDto) => http('timetables/lessons', { method: 'POST', body: JSON.stringify(payload) })
export const removeLesson = (lessonId: string | number) => http(`timetables/lessons/${lessonId}`, { method: 'DELETE' })
