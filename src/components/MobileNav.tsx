import React from 'react'
import { Link } from '@tanstack/react-router'

export const MobileNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden z-30">
      <div className="max-w-3xl mx-auto px-4 py-2 flex justify-between items-center">
  <Link to={'/dashboard/teacher' as any} className="flex flex-col items-center text-sm text-slate-700">
          <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          Dashboard
        </Link>
  <Link to={'/dashboard/teacher/classes' as any} className="flex flex-col items-center text-sm text-slate-700">
          <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
          Classes
        </Link>
        <Link to="/students" className="flex flex-col items-center text-sm text-slate-700">
          <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="3"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
          Students
        </Link>
      </div>
    </nav>
  )
}

export default MobileNav
