import { http } from './http';
import type { LoginDto } from '../types/backend.d';

export type LoginPayload = LoginDto;
export type LoginResponse = { access_token: string; user: any };

export function login(payload: LoginPayload) {
  return http<LoginResponse>('auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export function refreshToken() {
  return http<LoginResponse>('auth/refresh', { method: 'POST' });
}

export function logout() {
  return http('auth/logout', { method: 'POST' });
}
