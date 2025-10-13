import { useQuery } from '@tanstack/react-query'
import * as api from '../api/positions'

export function usePositions(params?: Record<string, any>) {
  return useQuery({ queryKey: ['positions', params || {}], queryFn: () => api.listPositions() })
}
