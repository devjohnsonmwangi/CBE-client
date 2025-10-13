import { useQuery } from '@tanstack/react-query'
import * as api from '../api/departments'

export function useDepartments(params?: Record<string, any>) {
  return useQuery({ queryKey: ['departments', params || {}], queryFn: () => api.listDepartments() })
}
