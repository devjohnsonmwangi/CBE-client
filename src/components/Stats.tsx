import React from 'react'

interface Stat {
  value: string
  label: string
}

interface StatsProps {
  title?: string
  subtitle?: string
  stats?: Stat[]
  bgColor?: string
}

const Stats: React.FC<StatsProps> = ({
  title = 'Trusted by educational institutions across the country',
  subtitle = 'Our platform is helping schools transform their operations and improve educational outcomes',
  stats = [],
  bgColor = 'bg-white',
}) => {
  // Default stats if none are provided
  const defaultStats: Stat[] = [
    { value: '500+', label: 'Schools using our platform' },
    { value: '250,000+', label: 'Students managed' },
    { value: '99.9%', label: 'System uptime' },
    { value: '85%', label: 'Time saved on administrative tasks' },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <section className={`py-16 sm:py-24 ${bgColor}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {displayStats.map((stat, index) => (
              <div key={index} className="flex flex-col bg-blue-50 p-8">
                <dt className="text-sm font-semibold leading-6 text-slate-600">
                  {stat.label}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-blue-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default Stats
