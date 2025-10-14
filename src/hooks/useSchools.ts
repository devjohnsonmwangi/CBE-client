import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as schoolsApi from '../api/schools'
import type { CreateSchoolDto, UpdateSchoolDto } from '../types'

export function useSchools() {
  return useQuery({ queryKey: ['schools'], queryFn: () => schoolsApi.listSchools() })
}

export function useCreateSchool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateSchoolDto) => schoolsApi.createSchool(payload),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['schools'] }),
  })
}

export function useUpdateSchool() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateSchoolDto }) => schoolsApi.updateSchool(id, payload),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['schools'] }),
  })
}
