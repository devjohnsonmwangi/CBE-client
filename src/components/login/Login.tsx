import React, { useState, useMemo } from "react";
import { useAuthStore } from '../../store/store';
import { useLogin } from '../../hooks/useLogin'
import type { SchoolRoleEnum } from '../../types'
import { AtSign, Lock, LogIn, Eye, EyeOff } from "lucide-react";

// --- IMPORTS ---
import authImage from "../../assets/imageses/loginimageatmwalimu.png";

// Simple local form validation — lightweight and resilient for mobile-like experience

const Login = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const currentToken = useAuthStore((s) => s.token)
  const currentUser = useAuthStore((s) => s.user)
  // Using window.location for navigation to avoid router typing surface here
  const loginMutation = useLogin()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValid = useMemo(() => {
    return email.includes('@') && password.length >= 6;
  }, [email, password]);

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!isValid) {
      setErrorMsg('Please provide a valid email and password (min 6 chars).')
      return
    }

    setIsSubmitting(true)
    setErrorMsg(null)
    try {
      const res = await loginMutation.mutateAsync({ email, password } as any)
      if (res?.access_token) {
        setAuth(res as { access_token: string; user: any })
        // Derive primary role from backend payload (supports both string and { role } shapes)
        const user = (res as any).user
        const roles: string[] = Array.isArray(user?.roles)
          ? user.roles.map((r: any) => (typeof r === 'string' ? r : r.role))
          : []

        const primaryRole: SchoolRoleEnum | null = (roles && roles.length > 0 ? (roles[0] as SchoolRoleEnum) : null)

        // Map backend roles to application landing pages. Update as needed.
        const roleTargetMap: Record<string, string> = {
          super_admin: '/admin',
          school_admin: '/school',
          dos: '/dos',
          teacher: '/teacher/dashboard',
          student: '/student/dashboard',
          parent: '/parent/dashboard',
          accountant: '/finance',
          librarian: '/library',
          kitchen_staff: '/kitchen',
          groundsman: '/grounds',
          support_staff: '/support',
          board_member: '/board',
        }

        const target = primaryRole ? (roleTargetMap[primaryRole] ?? '/dashboard') : '/dashboard'
        // small delay for better UX
        setTimeout(() => { window.location.href = target }, 400)
      } else {
        setErrorMsg('Invalid response from server')
      }
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err?.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isSubmitting || (loginMutation as any).isLoading || (loginMutation as any).status === 'loading';
  const mergeClasses = (...classes: string[]) => classes.filter(Boolean).join(' ');

  // If the user is already authenticated, redirect based on role to prevent duplicate logins.
  React.useEffect(() => {
    try {
      const roles: string[] = Array.isArray(currentUser?.roles)
        ? currentUser.roles.map((r: any) => (typeof r === 'string' ? r : r.role))
        : []
      const primaryRole: string | null = roles && roles.length > 0 ? roles[0] : null

      const roleTargetMap: Record<string, string> = {
        super_admin: '/admin',
        school_admin: '/school',
        dos: '/dos',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
        parent: '/parent/dashboard',
        accountant: '/finance',
        librarian: '/library',
        kitchen_staff: '/kitchen',
        groundsman: '/grounds',
        support_staff: '/support',
        board_member: '/board',
      }

      if (currentToken && primaryRole) {
        const target = roleTargetMap[primaryRole] ?? '/dashboard'
        window.setTimeout(() => { window.location.href = target }, 50)
      }
    } catch (e) {
      // ignore
    }
  }, [currentToken, currentUser])

  // Use local asset directly

  return (
    // --- JSX (UNCHANGED) ---
    <div className="min-h-screen flex flex-col lg:flex-row">
  {/* Toast system removed in favor of inline feedback */}
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="self-center text-2xl font-bold text-blue-700 whitespace-nowrap">@mwalimu</span>
          </a>
          <div className="hidden lg:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex flex-col lg:flex-row pt-20">
        <div className="relative lg:w-1/2 lg:h-screen flex flex-col items-start justify-start bg-gray-900 p-8">
          {/* Reserve space to prevent form collapsing while image loads */}
          <div className="w-full min-h-[420px] lg:min-h-[640px] flex items-center justify-center">
            <img loading="lazy" src={authImage} onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = authImage }} alt="A student engaged in learning on the @mwalimu platform" className="w-full h-full object-cover rounded-md shadow-lg" />
          </div>
          <div className="absolute bottom-12 left-12 p-4 hidden lg:block">
              <h2 className="text-4xl font-bold text-white leading-tight">Your Journey to Knowledge Starts Here.</h2>
              <p className="text-lg text-white/80 mt-4 max-w-lg">The best resources for Kenyan learners, curated by the community.</p>
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left mb-8">
               <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
                 <span className="text-blue-600">Welcome Back!</span>
               </h1>
               <p className="mt-3 text-gray-600 text-lg">Sign in to dive back into your learning.</p>
            </div>
            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className={mergeClasses(
                    "w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg focus:ring-2 transition-all duration-300",
                    "border-gray-300 focus:ring-blue-500"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errorMsg && (
                  <p className="text-red-500 text-xs mt-1 absolute left-0 right-0 text-center lg:text-left">
                    {errorMsg}
                  </p>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Secure Password"
                  className={mergeClasses(
                    "w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg focus:ring-2 transition-all duration-300",
                    "border-gray-300 focus:ring-blue-500"
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center pr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {/* show field-level errors via errorMsg for simplicity */}
              </div>
              <div className="text-right -mt-2">
                <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={mergeClasses(
                  "w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center",
                  isLoading ? "bg-blue-700" : ""
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-r-2 border-white rounded-full"></span>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login</span>
                  </>
                )}
              </button>
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/register" className="font-bold text-blue-600 hover:underline">Register Now</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;