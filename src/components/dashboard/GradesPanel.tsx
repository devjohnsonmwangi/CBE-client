import React from 'react'

export const GradesPanel: React.FC<{ average?: string }> = ({ average = '-' }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="font-medium mb-2">Class Average</div>
      <div className="text-2xl font-bold">{average}</div>
    </div>
  )
}

export default GradesPanel
