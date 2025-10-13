import { useQuery } from '@tanstack/react-query'
import * as api from '../api/academicYears'

export function useAcademicYears(params?: Record<string, any>) {
  return useQuery({ queryKey: ['academicYears', params || {}], queryFn: () => api.listAcademicYears(params) })
}
