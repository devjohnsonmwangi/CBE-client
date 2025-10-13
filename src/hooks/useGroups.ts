import { useQuery } from '@tanstack/react-query'
import * as api from '../api/groups'

export function useGroups(params?: Record<string, any>) {
  return useQuery({ queryKey: ['groups', params || {}], queryFn: () => api.listGroups(params) })
}
