import React from 'react'

export const StudentList: React.FC<{ students?: Array<{ id: number; name: string; admission?: string }>; onOpen?: (id: number) => void }> = ({ students = [], onOpen }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Students</div>
      <div className="space-y-2">
        {students.map((s) => (
          <button key={s.id} onClick={() => onOpen?.(s.id)} className="w-full text-left p-2 rounded hover:bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="text-sm">{s.name}</div>
              <div className="text-xs text-slate-400">{s.admission}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StudentList
