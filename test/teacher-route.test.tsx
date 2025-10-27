import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Provide a minimal mock for the router to avoid needing the full RouterProvider
vi.mock('@tanstack/react-router', async () => {
  // import actual so other utilities still work if needed
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...(actual as any),
    // minimal router shape expected by useRouterState
    useRouter: () => ({ __store: {} }),
    // simple Link replacement
    Link: (props: any) => {
      const { children, ...rest } = props
      return <a {...rest}>{children}</a>
    },
    useNavigate: () => () => {},
  }
})

// Mock the data hooks used by the teacher route so the component renders deterministically
vi.mock('../src/hooks/useTeacherClasses', () => ({
  useTeacherClasses: () => ({ data: [{ id: 1, name: 'Class 1A' }], isLoading: false, error: null }),
}))

vi.mock('../src/hooks/useTeacherAssignments', () => ({
  useTeacherAssignments: () => ({ data: [], isLoading: false, error: null }),
}))

vi.mock('../src/hooks/useNotifications', () => ({
  useNotifications: () => ({ data: [], isLoading: false, error: null }),
}))

vi.mock('../src/hooks/useClassStudents', () => ({
  useClassStudents: () => ({ data: [], isLoading: false, error: null }),
}))

// Import the route component under test
import TeacherRoute from '../src/routes/teacher/index'

describe('Teacher route', () => {
  it('mounts without throwing and shows the dashboard header', async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })

    render(
      <QueryClientProvider client={qc}>
        <TeacherRoute />
      </QueryClientProvider>,
    )

    // Expect the dashboard header to be present
    expect(await screen.findByText(/Teacher dashboard/i)).toBeTruthy()
  })
})
