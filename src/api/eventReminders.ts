import { http } from './http';
import type { CreateEventReminderDto } from '../types';

export interface EventReminder {
  id: number;
  event_id: number;
  minutes_before: number;
  channels: string[];
}

export const createEventReminder = (payload: CreateEventReminderDto) => http<EventReminder>('event-reminders', { method: 'POST', body: JSON.stringify(payload) });
