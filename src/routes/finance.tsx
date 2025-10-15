import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finance"!</div>
}
