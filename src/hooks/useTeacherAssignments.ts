import { useQuery } from '@tanstack/react-query'
import { listTeacherAssignments } from '../api/teacherAssignments'

export function useTeacherAssignments() {
  return useQuery({
    queryKey: ['teacher', 'assignments'],
    queryFn: async () => {
      const res = await listTeacherAssignments()
      return res
    },
    staleTime: 1000 * 30,
  })
}

export default useTeacherAssignments
