import { http } from './http';
import type { CreateUserDto, UpdateUserDto } from '../types';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number?: string;
  roles?: string[];
  school_id?: number;
}

export const listUsers = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<User[]>(`users${q}`);
};

export const getUser = (id: string) => http<User>(`users/${id}`);
export const createUser = (payload: CreateUserDto) => http<User>('users', { method: 'POST', body: JSON.stringify(payload) });
export const updateUser = (id: string, payload: UpdateUserDto) => http<User>(`users/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteUser = (id: string) => http(`users/${id}`, { method: 'DELETE' });
