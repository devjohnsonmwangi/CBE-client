import React from 'react'
import { Link } from '@tanstack/react-router'

interface Module {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

interface ModulesProps {
  title?: string
  subtitle?: string
  modules?: Module[]
  backgroundClass?: string
}

const Modules: React.FC<ModulesProps> = ({
  title = 'Comprehensive School Management Modules',
  subtitle = 'Our platform offers specialized modules for every aspect of school administration',
  modules = [],
  backgroundClass = 'bg-slate-50',
}) => {
  // Default modules if none are provided
  const defaultModules: Module[] = [
    {
      title: 'Academic Management',
      description:
        'Track curriculum, lessons, assessments, and CBC competencies with powerful tools for teachers and administrators.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      link: '/features/academic',
    },
    {
      title: 'Financial System',
      description:
        'Manage fee structures, generate invoices, track payments, and create detailed financial reports.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v12"></path>
          <path d="M8 12h8"></path>
        </svg>
      ),
      link: '/features/finance',
    },
    {
      title: 'Timetable & Scheduling',
      description:
        'Create and manage class schedules, teacher assignments, and venue allocation with automated conflict detection.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" x2="16" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="2" y2="6"></line>
          <line x1="3" x2="21" y1="10" y2="10"></line>
        </svg>
      ),
      link: '/features/timetable',
    },
    {
      title: 'Student Management',
      description:
        'Comprehensive student profiles with academic records, attendance tracking, behavior management, and parent communication.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      link: '/features/students',
    },
    {
      title: 'Communication Tools',
      description:
        'Integrated messaging, announcements, notifications, and event management to keep everyone connected.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      ),
      link: '/features/communication',
    },
    {
      title: 'Learning Management',
      description:
        'Create and deliver courses, assignments, quizzes, and learning materials with integrated grading tools.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-blue-600"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
      link: '/features/lms',
    },
  ]

  const displayModules = modules.length > 0 ? modules : defaultModules

  return (
    <section className={`py-16 sm:py-24 ${backgroundClass}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {displayModules.map((module, index) => (
              <div key={index} className="group relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  {module.icon}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold leading-8 tracking-tight text-slate-900">
                    <Link to={module.link} className="hover:underline">
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      {module.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {module.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modules
