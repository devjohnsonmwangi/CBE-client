import { useQuery } from '@tanstack/react-query'
import { listStudents } from '../api/students'

export function useClassStudents(classId?: number) {
  return useQuery({
    queryKey: ['class', classId, 'students'],
    enabled: !!classId,
    queryFn: async () => {
      const res = await listStudents({ class_id: String(classId) } as any)
      return res
    },
    staleTime: 1000 * 30,
  })
}

export default useClassStudents
