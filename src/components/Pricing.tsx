import React from 'react'
import { Link } from '@tanstack/react-router'

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: string
  billing: string
  description: string
  buttonText: string
  buttonLink: string
  highlighted?: boolean
  features: PricingFeature[]
}

interface PricingProps {
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
  backgroundClass?: string
}

const Pricing: React.FC<PricingProps> = ({
  title = 'Choose the right plan for your school',
  subtitle = 'Simple, transparent pricing that grows with your institution',
  plans = [],
  backgroundClass = 'bg-white',
}) => {
  // Default pricing plans if none are provided
  const defaultPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '199',
      billing: 'per month',
      description:
        'Perfect for small schools just getting started with digital management.',
      buttonText: 'Start your free trial',
      buttonLink: '/register',
      features: [
        { name: 'Up to 200 student profiles', included: true },
        { name: 'Academic management', included: true },
        { name: 'Basic timetable scheduling', included: true },
        { name: 'Simple fee management', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced financial reporting', included: false },
        { name: 'Learning management system', included: false },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false },
      ],
    },
    {
      name: 'Professional',
      price: '399',
      billing: 'per month',
      description:
        'Designed for growing schools with comprehensive management needs.',
      buttonText: 'Start your free trial',
      buttonLink: '/register',
      highlighted: true,
      features: [
        { name: 'Up to 1000 student profiles', included: true },
        { name: 'Academic management', included: true },
        { name: 'Advanced timetable scheduling', included: true },
        { name: 'Complete fee management', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced financial reporting', included: true },
        { name: 'Learning management system', included: true },
        { name: 'API access', included: false },
        { name: 'Custom integrations', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      billing: 'contact for pricing',
      description:
        'For large educational institutions with complex requirements.',
      buttonText: 'Contact sales',
      buttonLink: '/contact',
      features: [
        { name: 'Unlimited student profiles', included: true },
        { name: 'Academic management', included: true },
        { name: 'Advanced timetable scheduling', included: true },
        { name: 'Complete fee management', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Advanced financial reporting', included: true },
        { name: 'Learning management system', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
      ],
    },
  ]

  const displayPlans = plans.length > 0 ? plans : defaultPlans

  return (
    <section className={`py-16 sm:py-24 ${backgroundClass}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {displayPlans.map((plan, index) => (
            <div
              key={index}
              className={`
                rounded-3xl p-8 ring-1 ring-slate-200
                ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white lg:z-10 lg:shadow-xl lg:scale-105'
                    : 'bg-white'
                }
              `}
            >
              <h3
                className={`text-lg font-semibold leading-8 
                  ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-4 flex items-baseline gap-x-2
                  ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
              >
                <span className="text-4xl font-bold tracking-tight">
                  {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                </span>
                {plan.price !== 'Custom' && (
                  <span
                    className={`text-sm font-semibold leading-6
                      ${plan.highlighted ? 'text-slate-100' : 'text-slate-600'}`}
                  >
                    {plan.billing}
                  </span>
                )}
              </p>
              <p
                className={`mt-6 text-base leading-7
                  ${plan.highlighted ? 'text-slate-100' : 'text-slate-600'}`}
              >
                {plan.description}
              </p>
              <ul
                className={`mt-8 space-y-3 text-sm leading-6
                  ${plan.highlighted ? 'text-slate-100' : 'text-slate-600'}`}
              >
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex gap-x-3">
                    {feature.included ? (
                      <>
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
                          className={`h-6 w-5 flex-none 
                            ${plan.highlighted ? 'text-slate-100' : 'text-blue-600'}`}
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span
                          className={feature.included ? '' : 'line-through'}
                        >
                          {feature.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="h-6 w-5 flex-none" />
                        <span className="text-slate-400 line-through">
                          {feature.name}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.buttonLink}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2
                  ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-slate-50 focus-visible:outline-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600'
                  }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
