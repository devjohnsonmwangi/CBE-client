import React from 'react'
import { Link } from '@tanstack/react-router'

interface CallToActionProps {
  title?: string
  description?: string
  primaryText?: string
  primaryLink?: string
  secondaryText?: string
  secondaryLink?: string
  backgroundClass?: string
}

const CallToAction: React.FC<CallToActionProps> = ({
  title = 'Ready to transform your school administration?',
  description = 'Get started with CBC School Management System today and experience a more efficient way to manage your educational institution.',
  primaryText = 'Start Free Trial',
  primaryLink = '/register',
  secondaryText = 'Book a Demo',
  secondaryLink = '/demo',
  backgroundClass = 'bg-blue-600',
}) => {
  return (
    <section className={`${backgroundClass} py-16`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={primaryLink}
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {primaryText}
            </Link>
            <Link
              to={secondaryLink}
              className="rounded-md border border-white bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              {secondaryText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
