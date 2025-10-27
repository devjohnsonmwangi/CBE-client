import { useQuery } from '@tanstack/react-query'
import { listTimetables } from '../api/timetables'

export function useTeacherSchedule(teacherId?: number) {
  return useQuery({
    queryKey: ['teacher', teacherId, 'schedule'],
    enabled: !!teacherId,
    queryFn: async () => {
      const res = await listTimetables({ teacher_id: String(teacherId) } as any)
      return res
    },
  })
}

export default useTeacherSchedule
