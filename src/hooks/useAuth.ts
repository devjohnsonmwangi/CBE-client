import { useMutation } from '@tanstack/react-query'
import { logout as apiLogout, refreshWithCookie } from '../api/auth'
import { useAuthStore } from '../store/store'

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  return useMutation({
    mutationFn: async () => {
      try {
        await apiLogout()
      } finally {
        clearAuth()
      }
    },
  })
}

export function useRefresh() {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: async () => {
      const res = await refreshWithCookie()
      if (res?.access_token) setAuth(res as { access_token: string; user: any })
      return res
    },
  })
}

export default useLogout
