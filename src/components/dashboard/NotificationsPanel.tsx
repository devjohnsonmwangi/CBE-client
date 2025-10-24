import React from 'react'

export const NotificationsPanel: React.FC<{ items?: Array<{ id: number; text: string }> }> = ({ items = [] }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Notifications</div>
      <div className="space-y-2">
        {items.length === 0 && <div className="text-sm text-slate-500">No notifications</div>}
        {items.map((n) => (
          <div key={n.id} className="text-sm text-slate-700">
            {n.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsPanel
