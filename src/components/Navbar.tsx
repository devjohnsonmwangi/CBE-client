import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Avatar from '@radix-ui/react-avatar'
import { Link } from '@tanstack/react-router'

// School logo component with SVG
const SchoolLogo: React.FC = () => (
  <div className="flex items-center gap-3">
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CBE School Management logo"
    >
      {/* Building/School shape */}
      <rect width="36" height="36" rx="8" fill="#1e40af" />
      <path d="M8 10h20v18H8z" fill="#93c5fd" />
      <path d="M13 16h4v12h-4z" fill="#1e40af" />
      <path d="M19 16h4v12h-4z" fill="#1e40af" />
      <path d="M8 10l10-6 10 6" fill="#1e40af" />
      <path d="M16 28h4v4h-4z" fill="#1e40af" />
    </svg>
    <div className="flex flex-col">
      <span className="font-bold text-slate-800">CBE School</span>
      <span className="text-xs text-slate-500">Management System</span>
    </div>
  </div>
)

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <SchoolLogo />
            </Link>
          </div>

          {/* Main Navigation */}
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex space-x-8">
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Dashboard
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/students"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Students
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/teachers"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Teachers
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/courses"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Courses
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/finance"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Finance
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* User Account and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>

            {/* User Menu Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Avatar.Root className="h-8 w-8 rounded-full bg-slate-100">
                    <Avatar.Image
                      src="https://i.pravatar.cc/300"
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-medium uppercase text-slate-800">
                      AD
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <span className="hidden text-sm font-medium text-slate-700 md:block">
                    Admin User
                  </span>
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  className="mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Your Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-slate-200" />
                  <DropdownMenu.Item className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
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
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
