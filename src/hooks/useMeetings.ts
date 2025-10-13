import { useQuery } from '@tanstack/react-query'
import * as api from '../api/meetings'

export function useMeetings(params?: Record<string, any>) {
  return useQuery({ queryKey: ['meetings', params || {}], queryFn: () => api.listMeetings(params) })
}
