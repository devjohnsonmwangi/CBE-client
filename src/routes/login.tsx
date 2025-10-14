import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/login/Login'

// Cast to any to avoid typing mismatch between installed router and generator types
export const Route = (createFileRoute as any)({
  component: Login,
})
