import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'
import { useToast } from '../../hooks/use-toast'
import { loginWithGoogle } from '../../api/login'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Checkbox } from '../../components/ui/checkbox'
import { useLoginHook } from '../../hooks/useLogin'
import { usePasswordReset } from '../../hooks/usePasswordReset'
import { UserRole } from '../../types'
import { authStore } from '../../store/AuthStore'
import { useState, useEffect } from 'react'

// --- IMPORTS ---
import authImage from '../../../public/images/loginimageatmwalimu.png'

// Validation schema for login
const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter your email or username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Validation schema for forgot password
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Helper function for field validation
const validateField = (value: any, validator: any) => {
  try {
    validator.parse(value)
    return undefined
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.format()._errors?.[0] || 'Invalid input' }
    }
    return { message: 'Invalid input' }
  }
}

const Login = () => {
  const { toast } = useToast()
  const { mutateAsync: loginUser, isPending } = useLoginHook()
  const {
    handleForgotPassword,
    loading: resetLoading,
    error: resetError,
    success: resetSuccess,
  } = usePasswordReset()

  // Helper function to redirect based on user role
  const redirectBasedOnRole = (userRole: UserRole) => {
    // Resolve frontend base explicitly when available to avoid navigating to a
    // backend origin by accident. Prefer Vite env `VITE_FRONTEND_URL` when set.
    const frontendBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FRONTEND_URL) || window.location.origin

    // Using window.location for now since we have route type constraints
    // Route users to dashboards based on their role. Map all known backend
    // roles to their dedicated dashboards. Any unknown role falls back to
    // the 'staffs' dashboard.
    const roleStr = String(userRole).toLowerCase()
    switch (roleStr) {
      case 'super_admin':
        window.location.href = `${frontendBase}/dashboard/super-admin`
        break
      case 'school_admin':
        window.location.href = `${frontendBase}/dashboard/admin`
        break
      // 'dos' (Director of Studies)
      case 'dos':
        window.location.href = `${frontendBase}/dashboard/dos`
        break
      case 'teacher':
        window.location.href = `${frontendBase}/dashboard/teacher`
        break
      case 'student':
        window.location.href = `${frontendBase}/dashboard/student`
        break
      case 'parent':
        window.location.href = `${frontendBase}/dashboard/parent`
        break
      // finance / accounting roles
      case 'accountant':
        window.location.href = `${frontendBase}/dashboard/accountant`
        break
      case 'librarian':
        window.location.href = `${frontendBase}/dashboard/librarian`
        break
      // keep existing mapping for legacy 'customer' role
      case 'customer':
        window.location.href = `${frontendBase}/dashboard/user`
        break
      // default to staffs dashboard for any other role
      default:
        window.location.href = `${frontendBase}/dashboard/staffs`
    }
  }

  // Helper function to check if input is email
  const isEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input)
  }

  // State for forgot password, remember me, and tab switching
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Login form
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        // Transform the data to match backend expectations
        const loginData = isEmail(value.identifier)
          ? { email: value.identifier, password: value.password }
          : { username: value.identifier, password: value.password }

        const response = await loginUser(loginData)

        // Handle remember me (only if login was successful)
        if (response && response.success) {
          if (rememberMe) {
            localStorage.setItem('rememberedIdentifier', value.identifier)
          } else {
            localStorage.removeItem('rememberedIdentifier')
          }

          toast({
            variant: 'success',
            title: 'Success',
            description: 'Login successful!',
          })

            // Prefer the role returned by the login response (roles array or single role), fall back to auth store
            const respUser = (response as any).data?.user
            let userRole: any = undefined
            if (respUser) {
              if (Array.isArray(respUser.roles) && respUser.roles.length > 0) {
                userRole = respUser.roles[0]?.role || respUser.roles[0]
              } else if (respUser.role) {
                userRole = respUser.role
              }
            }
            if (!userRole) userRole = authStore.state.user.role
            // compute target and emit dev event before redirect
            try {
              const frontendBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FRONTEND_URL) || window.location.origin
              let target = `${frontendBase}/dashboard/staffs`
              const roleStr = String(userRole).toLowerCase()
              switch (roleStr) {
                case 'super_admin':
                  target = `${frontendBase}/dashboard/super-admin`
                  break
                case 'school_admin':
                  target = `${frontendBase}/dashboard/admin`
                  break
                case 'dos':
                  target = `${frontendBase}/dashboard/dos`
                  break
                case 'teacher':
                  target = `${frontendBase}/dashboard/teacher`
                  break
                case 'student':
                  target = `${frontendBase}/dashboard/student`
                  break
                case 'parent':
                  target = `${frontendBase}/dashboard/parent`
                  break
                case 'accountant':
                  target = `${frontendBase}/dashboard/accountant`
                  break
                case 'librarian':
                  target = `${frontendBase}/dashboard/librarian`
                  break
                case 'customer':
                  target = `${frontendBase}/dashboard/user`
                  break
                default:
                  target = `${frontendBase}/dashboard/staffs`
              }
              window.dispatchEvent(new CustomEvent('dev:redirect', { detail: { frontendBase, target } }))
              window.location.href = target
            } catch (err) {
              // fallback to previous behavior
              redirectBasedOnRole(userRole as any)
            }
        }
        // All error toasts are handled in the hook
      } catch (error: any) {
        // Error toasts are handled in the hook
      }
    },
  })

  // Forgot password form
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await handleForgotPassword(value)

        if (result) {
          forgotPasswordForm.reset()
        }
      } catch (error: any) {
        console.error('Password reset error:', error)
      }
    },
  })

  // Load remember me preference on component mount
  useEffect(() => {
    const rememberedIdentifier = localStorage.getItem('rememberedIdentifier')
    if (rememberedIdentifier) {
      setRememberMe(true)
      form.setFieldValue('identifier', rememberedIdentifier)
    }
  }, [])

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Google login successful!',
      })

  // Get user role from auth store and redirect accordingly (prefer roles array)
  const storeUser = authStore.state.user
  const userRole = Array.isArray(storeUser.roles) && storeUser.roles.length > 0 ? storeUser.roles[0] : storeUser.role
  redirectBasedOnRole(userRole as any)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: error.message || 'Google login failed',
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Keep the existing navigation */}
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="self-center text-2xl font-bold text-blue-700 whitespace-nowrap">
              @mwalimu
            </span>
          </a>
          <div className="hidden lg:flex space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col lg:flex-row pt-20">
        {/* Left side with image - keep existing styling */}
        <div className="relative lg:w-1/2 lg:h-screen flex flex-col items-start justify-start bg-gray-900 p-8">
          {/* Reserve space to prevent form collapsing while image loads */}
          <div className="w-full min-h-[420px] lg:min-h-[640px] flex items-center justify-center">
            <img
              loading="lazy"
              src={authImage}
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src = authImage
              }}
              alt="A student engaged in learning on the @mwalimu platform"
              className="w-full h-full object-cover rounded-md shadow-lg"
            />
          </div>
          <div className="absolute bottom-12 left-12 p-4 hidden lg:block">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your Journey to Knowledge Starts Here.
            </h2>
            <p className="text-lg text-white/80 mt-4 max-w-lg">
              The best resources for Kenyan learners, curated by the community.
            </p>
          </div>
        </div>

        {/* Right side with form */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            {/* Login or Forgot Password Form */}
            {!showForgotPassword ? (
              <>
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
                    <span className="text-blue-600">Welcome Back!</span>
                  </h1>
                  <p className="mt-3 text-gray-600 text-lg">
                    Sign in to dive back into your learning.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                  }}
                  className="mt-6 space-y-6"
                >
                  <form.Field
                    name="identifier"
                    validators={{
                      onChange: ({ value }) =>
                        validateField(value, loginSchema.shape.identifier),
                      onBlur: ({ value }) =>
                        validateField(value, loginSchema.shape.identifier),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label
                          htmlFor="identifier"
                          className="text-sm font-medium"
                        >
                          Email or Username
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="identifier"
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your email or username"
                            className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                          />
                        </div>
                        {field.state.meta.errors?.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="password"
                    validators={{
                      onChange: ({ value }) =>
                        validateField(value, loginSchema.shape.password),
                      onBlur: ({ value }) =>
                        validateField(value, loginSchema.shape.password),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium"
                          >
                            Password
                          </Label>
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm font-medium text-blue-600 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your password"
                            className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center pr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {field.state.meta.errors?.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        setRememberMe(checked === true)
                      }
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  </div>

                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        disabled={!canSubmit || isPending}
                        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isPending || isSubmitting ? (
                          <>
                            <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-r-2 border-white rounded-full"></span>
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <span>Sign In</span>
                        )}
                      </Button>
                    )}
                  </form.Subscribe>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center"
                  >
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Sign in with Google
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <a
                        href="/auth/register"
                        className="font-bold text-blue-600 hover:underline"
                      >
                        Register Now
                      </a>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              // Forgot Password Form
              <>
                <div className="flex items-center gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-xl font-bold text-foreground">
                    Reset Password
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground text-center mb-6">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>

                {resetSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                    {resetSuccess}
                  </div>
                )}

                {resetError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
                    {resetError}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    forgotPasswordForm.handleSubmit()
                  }}
                  className="space-y-4"
                >
                  <forgotPasswordForm.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) =>
                        validateField(value, forgotPasswordSchema.shape.email),
                      onBlur: ({ value }) =>
                        validateField(value, forgotPasswordSchema.shape.email),
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label
                          htmlFor="reset-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="reset-email"
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your email address"
                            className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                          />
                        </div>
                        {field.state.meta.errors?.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                      </div>
                    )}
                  </forgotPasswordForm.Field>

                  <forgotPasswordForm.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        disabled={!canSubmit || resetLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3.5 text-white font-bold rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                      >
                        {resetLoading || isSubmitting
                          ? 'Sending...'
                          : 'Send Reset Link'}
                      </Button>
                    )}
                  </forgotPasswordForm.Subscribe>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForgotPassword(false)
                    }}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
