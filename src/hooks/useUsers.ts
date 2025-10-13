import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as usersApi from '../api/users'

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: () => usersApi.listUsers() })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (payload: any) => usersApi.createUser(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }) })
}
