import { useMutation } from '@tanstack/react-query'
import { logout as apiLogout, refreshWithCookie } from '../api/auth'
<<<<<<< HEAD
import { authStore } from '../store/AuthStore'

export function useLogout() {
  const clearAuth = authStore((s) => s.clearAuth)
=======
import { authActions } from '../store/AuthStore'

export function useLogout() {
  const clearAuth = authActions.deleteUser
>>>>>>> b953a1d99e2b85a58789334386c4df82c3acb1e6
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
        username: loginRes.user?.username || loginRes.user?.full_name || loginRes.user?.name || '',
        full_name: loginRes.user?.full_name || loginRes.user?.name || undefined,
  // prefer user_id then id then empty string; avoid mixing ?? and || without parentheses
  id: String(loginRes.user?.user_id ?? loginRes.user?.id ?? ''),
        roles: Array.isArray(loginRes.user?.roles) ? loginRes.user.roles.map((r: any) => r.role) : loginRes.user?.roles || undefined,
        role: (Array.isArray(loginRes.user?.roles) && loginRes.user.roles[0]?.role) || loginRes.user?.role || undefined,
        profile_picture: loginRes.user?.profile_picture || loginRes.user?.profilePicture || null,
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
