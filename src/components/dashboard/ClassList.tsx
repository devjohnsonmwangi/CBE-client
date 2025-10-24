import React from 'react'

export const ClassList: React.FC<{ classes: { id: number; name: string }[]; onOpen?: (id: number) => void }> = ({ classes, onOpen }) => {
  return (
    <div className="space-y-2">
      {classes.map((c) => (
        <button
          key={c.id}
          onClick={() => onOpen?.(c.id)}
          className="w-full text-left rounded-lg p-3 bg-white border hover:bg-slate-50"
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

export default ClassList
