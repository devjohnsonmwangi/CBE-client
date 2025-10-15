import React from 'react'
import { Link } from '@tanstack/react-router'

interface HeroProps {
  title?: string
  subtitle?: string
  imagePath?: string
}

const Hero: React.FC<HeroProps> = ({
  title = 'CBC School Management System',
  subtitle = 'A comprehensive platform for managing all aspects of school operations',
  imagePath = '/images/hero-school.jpg',
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-slate-900/90 to-slate-900"></div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
      ></div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="text-center">
            {/* School logo */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 p-2">
              <svg
                width="64"
                height="64"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="CBE School Management logo"
                className="text-blue-400"
              >
                {/* Building/School shape */}
                <rect
                  width="36"
                  height="36"
                  rx="8"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path d="M8 10h20v18H8z" fill="currentColor" opacity="0.3" />
                <path d="M13 16h4v12h-4z" fill="currentColor" />
                <path d="M19 16h4v12h-4z" fill="currentColor" />
                <path d="M8 10l10-6 10 6" fill="currentColor" />
                <path d="M16 28h4v4h-4z" fill="currentColor" />
              </svg>
            </div>

            {/* Hero title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>

            {/* Hero subtitle */}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {subtitle}
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/auth/register"
                className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Get Started
              </Link>
              <Link
                to="/auth/login"
                className="rounded-md border border-blue-700 bg-transparent px-5 py-2.5 text-sm font-semibold text-blue-300 hover:bg-blue-950 hover:text-blue-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
