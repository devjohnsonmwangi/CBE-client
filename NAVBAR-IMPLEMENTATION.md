# Navbar Implementation Documentation

## Overview

This document describes the implementation of the responsive navigation bar for the CBE School Management System using Radix UI components.

## Components Used

- **Radix UI NavigationMenu**: For the main navigation links
- **Radix UI DropdownMenu**: For the user account dropdown menu
- **Radix UI Avatar**: For the user profile picture and fallback
- **Inline SVG**: For the school logo

## Features

1. **School Branding**:
   - Custom SVG school logo
   - School name with "Management System" subtitle

2. **Responsive Design**:
   - Fully responsive layout that adapts to mobile and desktop views
   - Mobile menu toggle for smaller screens

3. **Navigation Links**:
   - Main section links (Dashboard, Students, Teachers, Courses, Finance)
   - Uses TanStack Router's `Link` component for client-side navigation

4. **User Account Menu**:
   - Avatar with image support and text fallback
   - Dropdown menu with user actions (Profile, Settings, Sign out)
   - Notifications bell icon

5. **Accessibility**:
   - Proper ARIA attributes
   - Keyboard navigation support through Radix primitives
   - Screen reader friendly

## Usage

The Navbar component is already integrated into the application through the `Header.tsx` component. No additional configuration is needed.

If you want to modify the navigation items, edit the `NavigationMenu.List` section in `src/components/Navbar.tsx`.

## Styling

The component uses utility classes for styling, which should work with the existing TailwindCSS setup in the project.

## Dependencies

The following Radix UI packages were added to the project:

- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-avatar`

## Preview

To preview the navbar, run:

```bash
pnpm dev
```

Then visit: http://localhost:3000
