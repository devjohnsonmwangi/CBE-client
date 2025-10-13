import { http } from './http';
import type { CreateVenueDto, UpdateVenueDto } from '../types';

export interface Venue {
  id: number;
  school_id: number;
  name: string;
  capacity?: number;
}

export const listVenues = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Venue[]>(`venues${q}`);
};

export const getVenue = (id: string) => http<Venue>(`venues/${id}`);
export const createVenue = (payload: CreateVenueDto) => http<Venue>('venues', { method: 'POST', body: JSON.stringify(payload) });
export const updateVenue = (id: string, payload: UpdateVenueDto) => http<Venue>(`venues/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteVenue = (id: string) => http(`venues/${id}`, { method: 'DELETE' });
