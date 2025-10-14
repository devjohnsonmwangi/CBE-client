import { create } from 'zustand'

export type User = any

type AuthState = {
  user: User | null
  token: string | null
  /** Set the auth payload returned from login/refresh (or pass null to clear) */
  setAuth: (payload: { access_token: string; user: User } | null) => void
  clearAuth: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

function safeGetLocalStorageItem(key: string) {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

const initialToken = safeGetLocalStorageItem('token')
const initialUser = (() => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
})()

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: initialToken,
  setAuth(payload) {
    if (!payload) {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } catch (e) {
        /* ignore */
      }
      set({ user: null, token: null })
      return
    }

    const { access_token, user } = payload
    try {
      if (access_token) localStorage.setItem('token', access_token)
      if (user) localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      /* ignore */
    }

    set({ user, token: access_token })
  },
  clearAuth() {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (e) {
      /* ignore */
    }
    set({ user: null, token: null })
  },
  setUser(user) {
    try {
      if (user) localStorage.setItem('user', JSON.stringify(user))
      else localStorage.removeItem('user')
    } catch (e) {
      /* ignore */
    }
    set({ user })
  },
  setToken(token) {
    try {
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    } catch (e) {
      /* ignore */
    }
    set({ token })
  },
}))

export default useAuthStore
