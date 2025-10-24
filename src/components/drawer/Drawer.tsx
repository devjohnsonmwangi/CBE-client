import React from 'react'

interface DrawerProps {
  open: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-200 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-auto p-4">{children}</div>
      </aside>
    </div>
  )
}

export default Drawer
