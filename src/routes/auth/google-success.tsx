git import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/store'

export default function GoogleSuccess() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      // We don't have user info in the query — set token and attempt to fetch profile later.
      setAuth({ access_token: token, user: null })
      // Ideally fetch /auth/profile here to populate the user; keep simple for now.
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [navigate, setAuth])

  return <div className="min-h-screen flex items-center justify-center">Processing Google sign-in...</div>
}
