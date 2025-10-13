import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/subjectRequirements'

export function useSubjectRequirements(params?: Record<string, any>) {
  return useQuery({ queryKey: ['subjectRequirements', params || {}], queryFn: () => api.listSubjectRequirements(params) })
}

export function useCreateSubjectRequirement() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.createSubjectRequirement(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['subjectRequirements'] }) })
}
