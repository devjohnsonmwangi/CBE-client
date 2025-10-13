import { useQuery } from '@tanstack/react-query'
import * as api from '../api/courseModules'

export function useCourseModules(params?: Record<string, any>) {
  return useQuery({ queryKey: ['courseModules', params || {}], queryFn: () => api.listCourseModules(params) })
}
