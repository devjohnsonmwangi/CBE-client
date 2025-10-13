import { http } from './http';

export interface Group {
  id: number;
  name: string;
  description?: string;
}

// TODO: replace `any` payload types with generated DTOs for groups when available
export const listGroups = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Group[]>(`groups${q}`);
};

export const getGroup = (id: string) => http<Group>(`groups/${id}`);
export const createGroup = (payload: any) => http<Group>('groups', { method: 'POST', body: JSON.stringify(payload) });
export const updateGroup = (id: string, payload: any) => http<Group>(`groups/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteGroup = (id: string) => http(`groups/${id}`, { method: 'DELETE' });
