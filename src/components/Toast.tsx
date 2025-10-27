import React, { createContext, useContext, useState } from 'react'

type Toast = { id: number; message: string; type?: 'info' | 'success' | 'error' }

const ToastContext = createContext({
  push: (_t: Omit<Toast, 'id'>) => {},
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = (t: Omit<Toast, 'id'>) => {
    const id = Date.now()
    setToasts((s) => [...s, { id, ...t }])
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000)
  }
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`px-3 py-2 rounded shadow ${t.type === 'error' ? 'bg-red-600 text-white' : t.type === 'success' ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// no default export
