import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/enrollments'
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from '../types'

export function useEnrollments(params?: Record<string, any>) {
  return useQuery({ queryKey: ['enrollments', params || {}], queryFn: () => api.listEnrollments(params) })
}

export function useCreateEnrollment() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: CreateEnrollmentDto) => api.createEnrollment(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['enrollments'] }) })
}

export function useUpdateEnrollment() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }: { id: string | number; data: UpdateEnrollmentDto }) => api.updateEnrollment(String(id), data), onSuccess: () => qc.invalidateQueries({ queryKey: ['enrollments'] }) })
}
