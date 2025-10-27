import { useQuery } from '@tanstack/react-query'
import { listClasses } from '../api/classes'

export function useTeacherClasses() {
  return useQuery({
    queryKey: ['teacher', 'classes'],
    queryFn: async () => {
      const res = await listClasses()
      return res
    },
    staleTime: 1000 * 60, // 1 minute
  })
}

export default useTeacherClasses
