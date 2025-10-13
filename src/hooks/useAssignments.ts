import { useQuery } from '@tanstack/react-query'
import * as api from '../api/assignments'

export function useAssignments(params?: Record<string, any>) {
  return useQuery({ queryKey: ['assignments', params || {}], queryFn: () => api.listAssignments(params) })
}
