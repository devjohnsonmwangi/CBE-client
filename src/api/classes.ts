import { http } from './http';

export interface ClassModel {
  id: number;
  name: string;
  description?: string;
}

// TODO: replace `any` payload types with generated DTOs for classes when available
export const listClasses = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<ClassModel[]>(`classes${q}`);
};

export const getClass = (id: string) => http<ClassModel>(`classes/${id}`);
export const createClass = (payload: any) => http<ClassModel>('classes', { method: 'POST', body: JSON.stringify(payload) });
export const updateClass = (id: string, payload: any) => http<ClassModel>(`classes/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteClass = (id: string) => http(`classes/${id}`, { method: 'DELETE' });
