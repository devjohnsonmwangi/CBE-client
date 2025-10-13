import { http } from './http';
import type { CreateAnnouncementDto, UpdateAnnouncementDto } from '../types';

export interface Announcement {
  id: number;
  title: string;
  body: string;
}

export const listAnnouncements = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Announcement[]>(`announcements${q}`);
};

export const getAnnouncement = (id: string) => http<Announcement>(`announcements/${id}`);
export const createAnnouncement = (payload: CreateAnnouncementDto) => http<Announcement>('announcements', { method: 'POST', body: JSON.stringify(payload) });
export const updateAnnouncement = (id: string, payload: UpdateAnnouncementDto) => http<Announcement>(`announcements/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteAnnouncement = (id: string) => http(`announcements/${id}`, { method: 'DELETE' });
