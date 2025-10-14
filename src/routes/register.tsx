import { createFileRoute } from '@tanstack/react-router'
import Register from '../components/register/Register'

// Cast to any to avoid typing mismatch between installed router and generator types
export const Route = (createFileRoute as any)({
  component: Register,
})
