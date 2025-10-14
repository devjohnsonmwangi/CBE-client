import { useMutation } from '@tanstack/react-query'
import { login as loginApi } from '../api/auth'
import type { LoginDto } from '../types'
import { useAuthStore } from '../store/store'

export function useLogin(onSuccess?: (data: unknown) => void) {
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: async (payload: LoginDto) => {
      const res = await loginApi(payload)
      if (res?.access_token) setAuth(res as { access_token: string; user: any })
      if (onSuccess) onSuccess(res)
      return res
    },
  })
}
