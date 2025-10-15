import { useState } from 'react'
import { requestPasswordReset } from '../api/login'

interface PasswordResetProps {
  email: string
}

export function usePasswordReset() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleForgotPassword = async (data: PasswordResetProps) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await requestPasswordReset(data.email)
      setSuccess('Password reset link has been sent to your email')
      return result
    } catch (error: any) {
      setError(error.message || 'Failed to send reset link')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    handleForgotPassword,
    loading,
    error,
    success,
  }
}
