import { useMutation } from '@tanstack/react-query';
import * as api from '../api/eventReminders.ts';
import type { CreateEventReminderDto } from '../types';

export function useCreateEventReminder() {
  return useMutation({ mutationFn: (data: CreateEventReminderDto) => api.createEventReminder(data) });
}
