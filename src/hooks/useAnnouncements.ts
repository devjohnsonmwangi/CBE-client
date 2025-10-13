import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/announcements';
import type { CreateAnnouncementDto, UpdateAnnouncementDto } from '../types';

export function useAnnouncements(params?: Record<string, any>) {
  return useQuery({ queryKey: ['announcements', params || {}], queryFn: () => api.listAnnouncements(params) });
}

export function useAnnouncement(id?: string) {
  return useQuery({ queryKey: ['announcement', id], queryFn: () => (id ? api.getAnnouncement(id) : Promise.resolve(null)), enabled: !!id });
}

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: CreateAnnouncementDto) => api.createAnnouncement(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['announcements'] }) });
}

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: UpdateAnnouncementDto }) => api.updateAnnouncement(id, payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['announcements'] }) });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api.deleteAnnouncement(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['announcements'] }) });
}
