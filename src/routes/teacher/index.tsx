import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
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

// Use the file-route helper; cast to any to avoid typing friction with local router typings
export const Route = (createFileRoute as any)({
  component: RouteComponent,
})

function RouteComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const classes = [
    { id: 1, name: 'Grade 7A' },
    { id: 2, name: 'Grade 8B' },
  ]

  const students = [
    { id: 1, name: 'Alice Otieno', admission: 'ADM001' },
    { id: 2, name: 'Peter Mwangi', admission: 'ADM002' },
  ]

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
            <ClassList classes={classes} onOpen={(_) => setDrawerOpen(true)} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <Schedule items={[{ id: 1, title: 'Math - Grade 7A', time: '09:00' }]} />
            <AssignmentsPanel assignments={[{ id: 1, title: 'Algebra Homework', due: '2025-10-25' }]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StudentList students={students} />
              <div className="space-y-4">
                <AttendancePanel stats={{ present: 20, absent: 3 }} />
                <GradesPanel average="B+" />
              </div>
            </div>
          </div>
        </div>

        <NotificationsPanel items={[{ id: 1, text: 'New assignment submissions ready for grading' }]} />
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <button className="w-full py-2 rounded bg-blue-600 text-white">Create Assignment</button>
          <button className="w-full py-2 rounded border">Take Attendance</button>
          <button className="w-full py-2 rounded border">Message Class</button>
        </div>
      </Drawer>

      <MobileNav />
    </div>
  )
}

export default RouteComponent
