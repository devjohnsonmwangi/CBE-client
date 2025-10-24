import React from 'react'

export const AttendancePanel: React.FC<{ stats?: { present: number; absent: number } }> = ({ stats = { present: 0, absent: 0 } }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Attendance</div>
      <div className="flex items-center gap-4">
        <div>
          <div className="text-xs text-slate-500">Present</div>
          <div className="font-semibold">{stats.present}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Absent</div>
          <div className="font-semibold">{stats.absent}</div>
        </div>
      </div>
    </div>
  )
}

export default AttendancePanel
