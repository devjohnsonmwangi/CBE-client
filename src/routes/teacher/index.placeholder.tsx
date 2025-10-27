// Placeholder component moved from index.test.tsx to avoid having .test files in src/
export default function TeacherPlaceholder() {
  return <div>Teacher placeholder (moved from index.test)</div>
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/index/placeholder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/teacher/index/placeholder"!</div>
}
