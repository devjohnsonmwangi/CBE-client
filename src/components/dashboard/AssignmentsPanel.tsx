import React from 'react'

export const AssignmentsPanel: React.FC<{
  assignments?: Array<{ id: number; title: string; due?: string }>
  isLoading?: boolean
  error?: string | null
}> = ({ assignments = [], isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border p-3 bg-white">
        <div className="font-medium mb-2">Assignments</div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border p-3 bg-white">
        <div className="font-medium mb-2">Assignments</div>
        <div className="text-sm text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="font-medium mb-2">Assignments</div>
      </div>
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
