import React from 'react'

export const Schedule: React.FC<{ items?: Array<{ id: number; title: string; time?: string }> }> = ({ items = [] }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Today's Schedule</div>
      <div className="space-y-2">
        {items.length === 0 && <div className="text-sm text-slate-500">No events scheduled</div>}
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div className="text-sm">{it.title}</div>
            <div className="text-xs text-slate-400">{it.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Schedule
