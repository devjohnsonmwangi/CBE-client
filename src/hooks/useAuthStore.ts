import { useSyncExternalStore } from 'react'
import { authStore } from '../store/AuthStore'

// Small hook to subscribe to the TanStack Store and return its state
export function useAuthStore() {
  // subscribe function - the Store exposes a 'subscribe' method
  const subscribe = (cb: () => void) => {
    // @ts-ignore - Store has subscribe
    const unsub = authStore.subscribe?.(cb)
    if (typeof unsub === 'function') return unsub
    // fallback if subscribe isn't available
    const interval = setInterval(cb, 1000)
    return () => clearInterval(interval)
  }

  const getSnapshot = () => authStore.state

  // getServerSnapshot is required by React for server-rendered content.
  // When SSR is used, React will call this to get the snapshot used during
  // server rendering. We return the current store state (or a safe default)
  // so server and client snapshots are consistent.
  const getServerSnapshot = () => {
    try {
      return authStore.state
    } catch (err) {
      // If anything goes wrong on the server, return a safe initial-ish shape.
      return {
        isVerified: false,
        tokens: { accessToken: '', refreshToken: '' },
        user: { email: '', username: '', id: '', role: undefined },
      }
    }
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useAuthStore
