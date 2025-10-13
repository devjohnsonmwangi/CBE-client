import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/teacherPreferences'
import type { SetTeacherPreferencesDto } from '../types'

export function useTeacherPreferences(teacherId?: string | number) {
  return useQuery({ queryKey: ['teacherPreferences', teacherId || null], queryFn: () => api.getTeacherPreferences(teacherId), enabled: !!teacherId })
}

export function useSetTeacherPreferences() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: SetTeacherPreferencesDto) => api.setTeacherPreferences(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['teacherPreferences'] }) })
}
