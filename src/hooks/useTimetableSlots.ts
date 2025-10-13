import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/timetableSlots'

export function useTimetableSlots(params?: Record<string, any>) {
  return useQuery({ queryKey: ['timetableSlots', params || {}], queryFn: () => api.listTimetableSlots(params) })
}

export function useTimetableSlot(id?: string) {
  return useQuery({ queryKey: ['timetableSlot', id], queryFn: () => (id ? api.getTimetableSlot(id) : Promise.resolve(null)), enabled: !!id })
}

export function useCreateTimetableSlot() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.createTimetableSlot(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetableSlots'] }) })
}

export function useUpdateTimetableSlot() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: any }) => api.updateTimetableSlot(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetableSlots'] }) })
}

export function useDeleteTimetableSlot() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id: string) => api.deleteTimetableSlot(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetableSlots'] }) })
}
