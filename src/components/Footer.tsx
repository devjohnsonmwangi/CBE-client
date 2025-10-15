import React from 'react'
import { Link } from '@tanstack/react-router'

interface NavigationItem {
  name: string
  href: string
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

interface FooterProps {
  navigation?: NavigationSection[]
  socialLinks?: { name: string; href: string; icon: React.ReactNode }[]
  companyName?: string
  companyLogo?: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({
  navigation = [],
  socialLinks = [],
  companyName = 'CBC School Management System',
  companyLogo,
}) => {
  // Default navigation sections if none are provided
  const defaultNavigation: NavigationSection[] = [
    {
      title: 'Product',
      items: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Updates', href: '/updates' },
        { name: 'Demo', href: '/demo' },
      ],
    },
    {
      title: 'Solutions',
      items: [
        { name: 'Primary Schools', href: '/solutions/primary' },
        { name: 'Secondary Schools', href: '/solutions/secondary' },
        { name: 'Higher Education', href: '/solutions/higher' },
        { name: 'Special Education', href: '/solutions/special' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Support', href: '/support' },
        { name: 'FAQs', href: '/faqs' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
  ]

  // Default social links if none are provided
  const defaultSocialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.338 16.338h-2.563V13.16c0-.956-.02-2.186-1.328-2.186-1.329 0-1.53 1.041-1.53 2.118v3.247H8.354V9.504h2.458v1.125c.319-.6 1.135-1.237 2.331-1.237 2.475 0 2.944 1.634 2.944 3.756v3.19zM6.004 8.37a1.324 1.324 0 11.003-2.647 1.324 1.324 0 01-.003 2.647zm1.271 7.968H4.741V9.504h2.534v6.834zM17.338 3H4.5a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 004.5 21h12.838a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  const displayNavigation =
    navigation.length > 0 ? navigation : defaultNavigation
  const displaySocialLinks =
    socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  // Default logo if none is provided
  const defaultLogo = (
    <div className="flex items-center">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="text-blue-500"
      >
        <rect width="36" height="36" rx="8" fill="currentColor" opacity="0.2" />
        <path d="M8 10h20v18H8z" fill="currentColor" opacity="0.3" />
        <path d="M13 16h4v12h-4z" fill="currentColor" />
        <path d="M19 16h4v12h-4z" fill="currentColor" />
        <path d="M8 10l10-6 10 6" fill="currentColor" />
        <path d="M16 28h4v4h-4z" fill="currentColor" />
      </svg>
      <span className="ml-3 text-xl font-semibold text-slate-900">
        CBC School
      </span>
    </div>
  )

  const logo = companyLogo || defaultLogo

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/">{logo}</Link>
            <p className="text-sm leading-6 text-slate-600">
              Empowering educational institutions with technology to enhance
              learning outcomes and operational efficiency.
            </p>
            <div className="flex space-x-6">
              {displaySocialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {displayNavigation.slice(0, 2).map((section) => (
                <div key={section.title} className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-slate-900">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm leading-6 text-slate-600 hover:text-slate-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {displayNavigation.slice(2).map((section) => (
                <div key={section.title} className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-slate-900">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-sm leading-6 text-slate-600 hover:text-slate-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-slate-500">
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
