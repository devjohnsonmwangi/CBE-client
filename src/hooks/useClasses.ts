import { useQuery } from '@tanstack/react-query'
import * as api from '../api/classes'

export function useClasses(params?: Record<string, any>) {
  return useQuery({ queryKey: ['classes', params || {}], queryFn: () => api.listClasses(params) })
}
