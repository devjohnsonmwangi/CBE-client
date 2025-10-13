import { useQuery } from '@tanstack/react-query'
import * as api from '../api/courses'

export function useCourses(params?: Record<string, any>) {
  return useQuery({ queryKey: ['courses', params || {}], queryFn: () => api.listCourses(params) })
}
