import Login from '@/components/login/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})


