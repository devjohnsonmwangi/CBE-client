import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '../../store/store'

function GoogleSuccess() {
  // use window.location for redirects to keep router surface minimal here
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      // We don't have user info in the query — set token and attempt to fetch profile later.
      setAuth({ access_token: token, user: null })
      // Ideally fetch /auth/profile here to populate the user; keep simple for now.
      window.location.href = '/dashboard'
    } else {
      window.location.href = '/login'
    }
  }, [setAuth])

  return <div className="min-h-screen flex items-center justify-center">Processing Google sign-in...</div>
}

// Export a Route piece so the file-route generator recognizes this file.
// Cast to any to avoid typing mismatches between generator types and installed router.
export const Route = (createFileRoute as any)({
  component: GoogleSuccess,
})
