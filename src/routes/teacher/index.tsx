import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import useAuthStore from '../../hooks/useAuthStore'
import TeacherCard from '../../components/dashboard/TeacherCard'
import ClassList from '../../components/dashboard/ClassList'
import Schedule from '../../components/dashboard/Schedule'
import AssignmentsPanel from '../../components/dashboard/AssignmentsPanel'
import StudentList from '../../components/dashboard/StudentList'
import AttendancePanel from '../../components/dashboard/AttendancePanel'
import GradesPanel from '../../components/dashboard/GradesPanel'
import NotificationsPanel from '../../components/dashboard/NotificationsPanel'
import Drawer from '../../components/drawer/Drawer'
import MobileNav from '../../components/MobileNav'
import { useTeacherClasses } from '../../hooks/useTeacherClasses'
import { useTeacherAssignments } from '../../hooks/useTeacherAssignments'
import { useNotifications } from '../../hooks/useNotifications'
import { useClassStudents } from '../../hooks/useClassStudents'
import { createTeacherAssignment } from '../../api/teacherAssignments'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../../hooks/use-toast'
import { markNotificationRead } from '../../api/notifications'

// File-route helper: create a loosely-typed wrapper so the router-generator can find the
// `Route` identifier while keeping TypeScript happy.
const createRoute = (createFileRoute as unknown) as (opts: any) => any;
// Register the teacher route at '/dashboard/teacher' so teacher routes live under the dashboard namespace
export const Route = createRoute('/teacher/')({
  component: RouteComponent,
  // Route-level loader: quick synchronous guard to prevent rendering for unauthorized roles.
  // Uses localStorage so it can run before React mounts. It performs a hard redirect when
  // the user is not a teacher or super_admin.
  loader: () => {
    // Only run client-side — don't attempt to access window/localStorage during SSR
    if (typeof window === 'undefined') return null

    try {
      const raw = localStorage.getItem('auth')
      if (!raw) {
        // Not logged in
        window.location.href = '/auth/login'
        return null
      }
      const parsed = JSON.parse(raw)
      // backend may return roles array or single role field
      let role: string = ''
      if (Array.isArray(parsed?.user?.roles) && parsed.user.roles.length > 0) {
        role = String(parsed.user.roles[0]?.role || parsed.user.roles[0]).toLowerCase()
      } else if (parsed?.user?.role) {
        role = String(parsed.user.role).toLowerCase()
      }

      if (!role) {
        window.location.href = '/auth/login'
        return null
      }

      if (role !== 'teacher' && role !== 'super_admin') {
        const frontendBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FRONTEND_URL) || window.location.origin
        let target = `${frontendBase}/dashboard/staffs`
        if (role === 'school_admin') target = `${frontendBase}/dashboard/admin`
        else if (role === 'student') target = `${frontendBase}/dashboard/student`
        else if (role === 'parent') target = `${frontendBase}/dashboard/parent`
        else if (role === 'customer') target = `${frontendBase}/dashboard/user`
        window.location.href = target
        return null
      }
    } catch (err) {
      // On error, redirect to login
      try {
        window.location.href = '/auth/login'
      } catch (e) {}
      return null
    }
    return null
  },
})

function RouteComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const auth = useAuthStore()

  // Client-side guard: redirect unauthorized users away from the teacher dashboard.
  useEffect(() => {
    const role = (auth?.user as any)?.role ? String((auth as any).user.role).toLowerCase() : ''
    if (!role) return
    if (role !== 'teacher' && role !== 'super_admin') {
      // map other roles to their dashboards (keep simple mapping)
      const frontendBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FRONTEND_URL) || window.location.origin
      let target = `${frontendBase}/dashboard/staffs`
      if (role === 'school_admin') target = `${frontendBase}/dashboard/admin`
      else if (role === 'student') target = `${frontendBase}/dashboard/student`
      else if (role === 'parent') target = `${frontendBase}/dashboard/parent`
      else if (role === 'customer') target = `${frontendBase}/dashboard/user`
      window.location.href = target
    }
  }, [auth])

  const classesQuery = useTeacherClasses()
  const assignmentsQuery = useTeacherAssignments()
  const notificationsQuery = useNotifications()

  const classes = classesQuery.data || []

  // When a class is opened we fetch students for that class
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const studentsQuery = useClassStudents(selectedClass || undefined)
  const students = studentsQuery.data || []

  const studentItems = (students || []).map((s: any) => ({
    id: s.id,
    name: s.admission_number ? `#${s.admission_number}` : `Student ${s.id}`,
    admission: s.admission_number,
  }))

  // Mutation to create a teacher assignment (used by the Drawer quick action form)
  const qc = useQueryClient()
  const { toast } = useToast()
  const createAssignmentMutation = useMutation({
    mutationFn: async (payload: any) => {
      return createTeacherAssignment(payload)
    },
    onSuccess: () => {
      // refresh assignments list
      qc.invalidateQueries({ queryKey: ['teacher', 'assignments'] })
      setDrawerOpen(false)
      toast({ title: 'Assignment created', description: 'Your assignment was created', variant: 'success' })
    },
    onError: (err: any) => {
      console.error(err)
      toast({ title: 'Failed to create assignment', description: 'Unable to create assignment', variant: 'destructive' })
    },
  })

  const [newAssignmentTitle, setNewAssignmentTitle] = useState('')
  const [newAssignmentDue, setNewAssignmentDue] = useState('')

  const markReadMutation = useMutation({
    mutationFn: async (id: number) => markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Teacher dashboard</h1>
          <button onClick={() => setDrawerOpen(true)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Open panel</button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <TeacherCard name="Samuel Teacher" role="Class Teacher" email="sam@school.test" />
            <ClassList classes={classes} onOpen={(id) => { setSelectedClass(id); setDrawerOpen(true) }} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <Schedule items={(classesQuery.data && classesQuery.data.slice(0, 3).map((c: any, i: number) => ({ id: i + 1, title: `${c.name} - Lesson`, time: '09:00' }))) || []} isLoading={classesQuery.isLoading} error={classesQuery.error as any} />
            <AssignmentsPanel assignments={(assignmentsQuery.data as any) || []} isLoading={assignmentsQuery.isLoading} error={assignmentsQuery.error as any} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StudentList students={studentItems} />
              <div className="space-y-4">
                <AttendancePanel stats={{ present: 20, absent: 3 }} />
                <GradesPanel average="B+" />
              </div>
            </div>
          </div>
        </div>

  <NotificationsPanel items={(notificationsQuery.data as any) || []} isLoading={notificationsQuery.isLoading} error={notificationsQuery.error as any} onMarkRead={(id) => markReadMutation.mutate(id)} />
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick actions</h2>

          <div className="rounded border p-3 bg-white">
            <div className="text-sm font-medium mb-2">Create assignment</div>
            <div className="space-y-2">
              <input value={newAssignmentTitle} onChange={(e) => setNewAssignmentTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
              <input value={newAssignmentDue} onChange={(e) => setNewAssignmentDue(e.target.value)} type="date" className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <button
                  onClick={() => createAssignmentMutation.mutate({ title: newAssignmentTitle, due_date: newAssignmentDue, class_id: selectedClass })}
                  disabled={createAssignmentMutation.status === 'pending' || !newAssignmentTitle}
                  className="flex-1 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
                >
                  {createAssignmentMutation.status === 'pending' ? 'Creating…' : 'Create'}
                </button>
                <button onClick={() => { setNewAssignmentTitle(''); setNewAssignmentDue('') }} className="py-2 px-3 rounded border">Reset</button>
              </div>
            </div>
          </div>

          <div className="rounded border p-3 bg-white">
            <div className="text-sm font-medium mb-2">Take attendance</div>
            <div className="text-sm text-slate-500">Attendance feature is not yet implemented. Use the attendance panel to view stats.</div>
            <div className="mt-2">
              <button className="w-full py-2 rounded border">Open attendance</button>
            </div>
          </div>

          <div className="rounded border p-3 bg-white">
            <div className="text-sm font-medium mb-2">Message class</div>
            <div className="text-sm text-slate-500">Quick messaging will be available in the next iteration.</div>
          </div>
        </div>
      </Drawer>

      <MobileNav />
    </div>
  )
}

export default RouteComponent
