import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ClassList from '../../components/dashboard/ClassList'
import StudentList from '../../components/dashboard/StudentList'
import { useTeacherClasses } from '../../hooks/useTeacherClasses'
import { useClassStudents } from '../../hooks/useClassStudents'

// File-route helper: create a loosely-typed wrapper so the router-generator can find the
// `Route` identifier while keeping TypeScript happy.
const createRoute = (createFileRoute as unknown) as (opts: any) => any
export const Route = createRoute('/teacher/classes')({ component: RouteComponent })

function RouteComponent() {
  const classesQuery = useTeacherClasses()
  const classes = classesQuery.data || []

  const [selectedClass, setSelectedClass] = React.useState<number | null>(null)
  const studentsQuery = useClassStudents(selectedClass || undefined)
  const students = studentsQuery.data || []

  // Map backend Student shape to the UI shape expected by StudentList
  const studentItems = (students || []).map((s: any) => ({
    id: s.id,
    name: s.admission_number ? `#${s.admission_number}` : `Student ${s.id}`,
    admission: s.admission_number,
  }))

  return (
    <div className="min-h-screen p-4 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Class Teacher dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ClassList classes={classes} onOpen={(id) => setSelectedClass(id)} />
          </div>
          <div className="md:col-span-2 space-y-4">
            <StudentList students={studentItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouteComponent
