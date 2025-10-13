import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/terms'

export function useTerms(params?: Record<string, any>) {
  return useQuery({ queryKey: ['terms', params || {}], queryFn: () => api.listTerms(params) })
}

export function useCreateTerm() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.createTerm(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['terms'] }) })
}
