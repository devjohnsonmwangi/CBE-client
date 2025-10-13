import { http } from './http';
import type { CreateTimetableSlotDto, UpdateTimetableSlotDto } from '../types';

export interface TimetableSlot {
  id: number;
  school_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export const listTimetableSlots = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<TimetableSlot[]>(`timetable-slots${q}`);
};

export const getTimetableSlot = (id: string) => http<TimetableSlot>(`timetable-slots/${id}`);
export const createTimetableSlot = (payload: CreateTimetableSlotDto) => http<TimetableSlot>('timetable-slots', { method: 'POST', body: JSON.stringify(payload) });
export const updateTimetableSlot = (id: string, payload: UpdateTimetableSlotDto) => http<TimetableSlot>(`timetable-slots/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTimetableSlot = (id: string) => http(`timetable-slots/${id}`, { method: 'DELETE' });
