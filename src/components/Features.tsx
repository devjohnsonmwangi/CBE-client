import React from 'react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const Features: React.FC<FeaturesProps> = ({
  title = 'Comprehensive School Management',
  subtitle = 'Everything you need to run your educational institution efficiently and effectively',
  features = [],
}) => {
  // Default features if none are provided
  const defaultFeatures: Feature[] = [
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      title: 'Academic Management',
      description:
        'Curriculum planning, assessments, grades, and competency tracking in one integrated system.',
    },
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 0 0-16 0"></path>
        </svg>
      ),
      title: 'Student Management',
      description:
        'Track enrollment, attendance, behavior, and performance for each student in your institution.',
    },
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2"></path>
          <path d="M18 8a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4Z"></path>
          <path d="M18 12v4"></path>
        </svg>
      ),
      title: 'Financial Management',
      description:
        'Automate fee structures, invoicing, payment tracking, and generate financial reports.',
    },
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M21 9H3"></path>
          <path d="M9 21V9"></path>
        </svg>
      ),
      title: 'Class & Timetable',
      description:
        'Create and manage classes, assign teachers, and generate automated timetables for the entire school.',
    },
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      ),
      title: 'Learning Management',
      description:
        'Create courses, assignments, quizzes, and provide online learning materials for students.',
    },
    {
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
          className="h-6 w-6 text-blue-500"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      ),
      title: 'Communication Tools',
      description:
        'Integrated chat, announcements, notifications, and event management for seamless communication.',
    },
  ]

  const displayFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {displayFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-slate-100 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-8 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-base leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
