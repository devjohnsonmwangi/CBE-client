import { http } from './http'
import API_DOMAIN from '../apidomain'
import type { LoginDto } from '../types'

export type LoginPayload = LoginDto
export type LoginResponse = { access_token: string; user: any }

export function login(payload: LoginPayload) {
  return http<LoginResponse>('auth/login', { method: 'POST', body: JSON.stringify(payload) })
}

/**
 * Refresh tokens using the refresh_token cookie set by the backend.
 * This must send credentials so the browser includes the httpOnly cookie.
 */
export async function refreshWithCookie() {
  const url = `${API_DOMAIN.replace(/\/$/, '')}/auth/refresh`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const error = new Error((data && data.message) || res.statusText)
    ;(error as any).status = res.status
    ;(error as any).data = data
    throw error
  }

  return data as LoginResponse
}

export function logout() {
  return http('auth/logout', { method: 'POST' })
}
