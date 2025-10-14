import { useMutation } from '@tanstack/react-query'
import { createUser } from '../api/users'

export function useRegister(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await createUser(payload)
      if (onSuccess) onSuccess()
      return res
    },
  })
}

export default useRegister
