import React from 'react'

export const NotificationsPanel: React.FC<{
  items?: Array<{ id: number; text: string }>
  isLoading?: boolean
  error?: string | null
  onMarkRead?: (id: number) => void
}> = ({ items = [], isLoading, error, onMarkRead }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border p-3 bg-white">
        <div className="font-medium mb-2">Notifications</div>
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
        <div className="font-medium mb-2">Notifications</div>
        <div className="text-sm text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Notifications</div>
      <div className="space-y-2">
        {items.length === 0 && <div className="text-sm text-slate-500">No notifications</div>}
        {items.map((n) => (
          <div key={n.id} className="flex items-center justify-between">
            <div className="text-sm text-slate-700">{n.text}</div>
            {onMarkRead && (
              <button onClick={() => onMarkRead(n.id)} className="text-xs text-blue-600 underline">Mark read</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsPanel
