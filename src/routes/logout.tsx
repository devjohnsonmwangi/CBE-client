import { createFileRoute } from '@tanstack/react-router'
import Logout from '../components/logout/logout'

// Cast to any to avoid typing mismatch between installed router and generator types
export const Route = (createFileRoute as any)({
  component: Logout,
})
