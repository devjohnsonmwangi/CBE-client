import { useMutation } from '@tanstack/react-query'
import { loginWithEmailPassword } from '../api/login'
import { useToast } from './use-toast'

interface LoginData {
  email?: string
  username?: string
  password: string
}

export function useLoginHook() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (loginData: LoginData) => {
      const response = await loginWithEmailPassword(loginData)

      if (!response.success) {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: response.message || 'Invalid credentials',
        })
        throw new Error(response.message || 'Login failed')
      }

      return response
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: error.message || 'An error occurred during login',
      })
    },
  })
}
