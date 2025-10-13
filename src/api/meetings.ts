import { http } from './http';

export interface Meeting {
  id: number;
  title: string;
  start_time?: string;
  end_time?: string;
}

// TODO: replace `any` payload types with generated DTOs for meetings when available
export const listMeetings = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<Meeting[]>(`meetings${q}`);
};

export const getMeeting = (id: string) => http<Meeting>(`meetings/${id}`);
export const createMeeting = (payload: any) => http<Meeting>('meetings', { method: 'POST', body: JSON.stringify(payload) });
export const updateMeeting = (id: string, payload: any) => http<Meeting>(`meetings/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteMeeting = (id: string) => http(`meetings/${id}`, { method: 'DELETE' });
