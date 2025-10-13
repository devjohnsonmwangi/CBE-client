import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as ttApi from '../api/timetables'
import type { CreateTimetableVersionDto, CreateLessonDto } from '../types'

export function useTimetables() {
  return useQuery({ queryKey: ['timetables'], queryFn: () => ttApi.listTimetables() })
}

export function useCreateTimetableVersion() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: CreateTimetableVersionDto) => ttApi.createTimetable(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetables'] }) })
}

export function useUpdateTimetableVersion() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }: { id: string | number; data: Partial<CreateTimetableVersionDto> }) => ttApi.updateTimetable(String(id), data), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetables'] }) })
}

export function useAddLesson() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: CreateLessonDto) => ttApi.addLesson(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetables'] }) })
}

export function useRemoveLesson() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id: string | number) => ttApi.removeLesson(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['timetables'] }) })
}
