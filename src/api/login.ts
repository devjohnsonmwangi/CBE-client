import { http } from './http'
import { authActions } from '../store/AuthStore'
import { globalDataType, UserRole } from '@/types'
import API_DOMAIN from '../apidomain'

interface LoginResponse {
  success: boolean
  data?: globalDataType
  message?: string
}

interface LoginData {
  email?: string
  username?: string
  password: string
}

export async function loginWithEmailPassword(
  data: LoginData,
): Promise<LoginResponse> {
  try {
    // Backend returns { access_token, refresh_token, user }
    const response = await http<any>('auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (response) {
      const mapped: globalDataType = {
        isVerified: true,
        tokens: {
          accessToken: response.access_token || response.tokens?.access_token || response.tokens?.accessToken || '',
          refreshToken: response.refresh_token || response.tokens?.refresh_token || response.tokens?.refreshToken || '',
        },
        user: {
          email: response.user?.email || response.user?.username || '',
          username: response.user?.username || response.user?.full_name || response.user?.email || '',
          full_name: response.user?.full_name || response.user?.name || undefined,
          roles: Array.isArray(response.user?.roles)
            ? response.user.roles.map((r: any) => r.role)
            : response.user?.roles || undefined,
          // backend uses `user_id` for id
          id: String(response.user?.user_id ?? response.user?.id ?? response.user?._id ?? ''),
          // primary role: prefer first role in roles array, else fallback to single role field
          role:
            (Array.isArray(response.user?.roles) && response.user.roles[0]?.role) ||
            (response.user?.role as UserRole) ||
            UserRole.CUSTOMER,
          profile_picture:
            response.user?.profile_picture || response.user?.profilePicture || response.user?.photo || null,
        },
      }

      authActions.saveUser(mapped)
      return { success: true, data: mapped }
    }
    return { success: false, message: 'Invalid credentials' }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Login failed',
    }
  }
}

export async function loginWithGoogle(): Promise<LoginResponse> {
  try {
    // Start OAuth by redirecting the browser to the backend OAuth start endpoint.
    // The backend will set a refresh cookie and redirect back to /auth/google-success
    window.location.href = `${API_DOMAIN.replace(/\/$/, '')}/auth/google`
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Google login failed',
    }
  }
}

export async function requestPasswordReset(email: string): Promise<boolean> {
  try {
    await http('auth/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    return true
  } catch (error) {
    throw new Error('Failed to request password reset')
  }
}
