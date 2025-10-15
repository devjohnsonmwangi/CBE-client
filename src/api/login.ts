import { http } from './http'
import { authActions } from '../store/AuthStore'
import { globalDataType, UserRole } from '@/types'

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
    const response = await http<globalDataType>('auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (response) {
      authActions.saveUser(response)
      return { success: true, data: response }
    } else {
      return { success: false, message: 'Invalid credentials' }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Login failed',
    }
  }
}

export async function loginWithGoogle(): Promise<LoginResponse> {
  try {
    // This would typically redirect to Google OAuth
    // For now, mock the response
    const mockResponse: globalDataType = {
      isVerified: true,
      tokens: {
        accessToken: 'google-mock-token',
        refreshToken: 'google-mock-refresh-token',
      },
      user: {
        email: 'google@example.com',
        username: 'googleUser',
        id: 'google-123',
        role: UserRole.CUSTOMER,
      },
    }

    authActions.saveGoogleUser(mockResponse)
    return { success: true, data: mockResponse }
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
