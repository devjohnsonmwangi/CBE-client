import type { CreateSchoolDto, UpdateSchoolDto } from '../types'
import { http } from './http';

export interface School {
  id: number;
  name: string;
  address?: string;
}

export const listSchools = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<School[]>(`schools${q}`);
};

export const getSchool = (id: string | number) => http<School>(`schools/${id}`);
export const createSchool = (payload: CreateSchoolDto) => http<School>('schools', { method: 'POST', body: JSON.stringify(payload) });
export const updateSchool = (id: string | number, payload: UpdateSchoolDto) => http<School>(`schools/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteSchool = (id: string | number) => http(`schools/${id}`, { method: 'DELETE' });
