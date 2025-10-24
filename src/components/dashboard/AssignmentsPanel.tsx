import React from 'react'

export const AssignmentsPanel: React.FC<{ assignments?: Array<{ id: number; title: string; due?: string }> }> = ({ assignments = [] }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Assignments</div>
      <div className="space-y-2">
        {assignments.length === 0 && <div className="text-sm text-slate-500">No assignments</div>}
        {assignments.map((a) => (
          <div key={a.id} className="flex items-center justify-between">
            <div className="text-sm">{a.title}</div>
            <div className="text-xs text-slate-400">{a.due}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssignmentsPanel
