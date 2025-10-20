import { useMutation } from '@tanstack/react-query'
import { logout as apiLogout, refreshWithCookie } from '../api/auth'
import { authActions } from '../store/AuthStore'

export function useLogout() {
  const clearAuth = authActions.deleteUser
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
  // Helper maps backend refresh response to the app's globalDataType
  const setAuth = (loginRes: { access_token: string; user: any }) => {
    const payload = {
      isVerified: true,
      tokens: {
        accessToken: loginRes.access_token,
        refreshToken: '', // refresh token is stored in httpOnly cookie
      },
      user: {
        email: loginRes.user?.email || '',
        username: loginRes.user?.username || loginRes.user?.name || '',
        id: String(loginRes.user?.id || ''),
        role: loginRes.user?.role || undefined,
      },
    }

    // Use the centralized action to save user into the store and localStorage
    authActions.saveUser(payload as any)
  }
  return useMutation({
    mutationFn: async () => {
      const res = await refreshWithCookie()
      if (res?.access_token) setAuth(res as { access_token: string; user: any })
      return res
    },
  })
}

export default useLogout
