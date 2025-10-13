import { useQuery } from '@tanstack/react-query'
import * as api from '../api/assessments'

export function useAssessments(params?: Record<string, any>) {
  return useQuery({ queryKey: ['assessments', params || {}], queryFn: () => api.listAssessments(params) })
}
