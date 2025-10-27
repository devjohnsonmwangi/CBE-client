import { useQuery } from '@tanstack/react-query'
import { listNotifications } from '../api/notifications'

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await listNotifications()
      return res
    },
    staleTime: 1000 * 20,
  })
}

export default useNotifications
