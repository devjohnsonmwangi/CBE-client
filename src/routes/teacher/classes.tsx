import { createFileRoute } from '@tanstack/react-router'
import ClassList from '../../components/dashboard/ClassList'
import StudentList from '../../components/dashboard/StudentList'

export const Route = (createFileRoute as any)({
  component: RouteComponent,
})

function RouteComponent() {
  const classes = [
    { id: 1, name: 'Grade 7A' },
    { id: 2, name: 'Grade 8B' },
  ]

  const students = [
    { id: 1, name: 'Alice Otieno', admission: 'ADM001' },
    { id: 2, name: 'Peter Mwangi', admission: 'ADM002' },
  ]

  return (
    <div className="min-h-screen p-4 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Class Teacher dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <ClassList classes={classes} />
          </div>
          <div className="md:col-span-2 space-y-4">
            <StudentList students={students} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouteComponent
