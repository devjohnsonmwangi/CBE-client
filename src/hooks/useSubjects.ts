import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as subjectsApi from '../api/subjects'

export function useSubjects() {
  return useQuery({ queryKey: ['subjects'], queryFn: () => subjectsApi.listSubjects() })
}

export function useCreateSubject() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (payload: any) => subjectsApi.createSubject(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['subjects'] }) })
}
