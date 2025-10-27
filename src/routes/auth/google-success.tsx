import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { http } from '../../api/http'
import { authActions } from '../../store/AuthStore'
import { useToast } from '../../hooks/use-toast'

const createRoute = (createFileRoute as unknown) as (opts: any) => any
export const Route = createRoute('/auth/google-success')({ component: RouteComponent })

function RouteComponent() {
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => {
      try {
        // Call refresh endpoint which should be guarded by the refresh-token cookie set by the backend
        const resp = await http<any>('auth/refresh', { method: 'POST' })

        if (resp) {
          const mapped = {
            isVerified: true,
            tokens: {
              accessToken: resp.access_token || resp.tokens?.access_token || '' ,
              refreshToken: resp.refresh_token || resp.tokens?.refresh_token || '' ,
            },
            user: {
              email: resp.user?.email || '',
              username: resp.user?.username || resp.user?.full_name || '',
              full_name: resp.user?.full_name || resp.user?.name || undefined,
              roles: Array.isArray(resp.user?.roles) ? resp.user.roles.map((r: any) => r.role) : resp.user?.roles || undefined,
              id: String(resp.user?.user_id ?? resp.user?.id ?? resp.user?._id ?? ''),
              role: (Array.isArray(resp.user?.roles) && resp.user.roles[0]?.role) || resp.user?.role,
              profile_picture: resp.user?.profile_picture || resp.user?.profilePicture || resp.user?.photo || null,
            },
          }

          authActions.saveUser(mapped)
          toast({ variant: 'success', title: 'Signed in', description: 'Google sign-in successful' })
          // Redirect based on role (so teachers go to the teacher dashboard)
          const frontendBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FRONTEND_URL) || window.location.origin
          const role = mapped.user?.role
          let target = `${frontendBase}/dashboard`
           if (role === 'teacher' || role === 'super_admin') {
             target = `${frontendBase}/dashboard/teacher`
          } else if (role === 'school_admin') {
            target = `${frontendBase}/dashboard/admin`
          } else if (role === 'customer') {
            target = `${frontendBase}/dashboard/user`
          }
          window.dispatchEvent(new CustomEvent('dev:redirect', { detail: { frontendBase, target } }))
          window.location.href = target
        } else {
          toast({ variant: 'destructive', title: 'Sign-in failed', description: 'Unable to complete Google sign-in' })
          window.location.href = '/auth/login'
        }
      } catch (err: any) {
        console.error('Google oauth finish error', err)
        toast({ variant: 'destructive', title: 'Sign-in failed', description: err?.message || 'OAuth failed' })
        window.location.href = '/auth/login'
      }
    })()
  }, [])

  return <div className="min-h-screen flex items-center justify-center">Completing sign-in…</div>
}

export default RouteComponent
