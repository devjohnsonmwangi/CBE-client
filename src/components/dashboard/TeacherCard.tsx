import React from 'react'

export const TeacherCard: React.FC<{ name: string; role?: string; email?: string }> = ({ name, role, email }) => {
  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-blue-800">{name.charAt(0)}</div>
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
          {email && <div className="text-xs text-slate-400">{email}</div>}
        </div>
      </div>
    </div>
  )
}

export default TeacherCard
