# CBC School Management System API

## 1. Introduction

The Competency-Based Curriculum (CBC) School Management System is a comprehensive platform designed to manage all aspects of school operations. This README provides designers with an overview of the system's features, modules, and user roles to guide the creation of an intuitive and effective frontend interface.

## 2. System Overview

This API serves as the backend for a full-featured school management system that supports:

- Multiple schools/institutions (multi-tenant architecture)
- Comprehensive user role management
- Academic operations (curriculum, assessments, timetables)
- Administrative functions (finance, attendance, discipline)
- Communication tools (chat, notifications, announcements)
- Learning management system (courses, assignments, quizzes)

## 3. Core Modules

### 3.1 User Management & Authentication

- **Features**: Registration, login, profile management, role-based access control
- **Authentication Methods**: JWT tokens, Google OAuth integration
- **User Types**: Students, teachers, administrators, parents, support staff
- **Roles System**: Users can have multiple roles (e.g., a user can be both a parent and a teacher)

### 3.2 School Administration

- **School Setup**: Registration, configuration, branding
- **Departments**: Academic and administrative department management
- **Positions**: Staff positions and hierarchy
- **Academic Structure**: Years, terms, classes, subjects

### 3.3 Academic Management

- **Curriculum**: Subject management, lesson planning
- **Classes & Enrollment**: Class creation, student enrollment
- **Assessments**: Grades, reports, CBC competency tracking
- **Timetabling**: Automated and manual schedule generation

### 3.4 Learning Management System (LMS)

- **Courses**: Online course creation and management
- **Course Modules**: Structured learning units
- **Lesson Contents**: Text, video, and interactive materials
- **Assignments & Quizzes**: Online submission and auto-grading

### 3.5 Financial Management

- **Fee Structures**: Grade-level fee configuration
- **Invoicing**: Automated term-based billing
- **Payments**: Online and offline payment tracking
- **Reports**: Financial statements and analysis

### 3.6 Communication

- **Chat System**: Real-time messaging with encryption
- **Announcements**: School-wide and targeted announcements
- **Notifications**: System alerts and reminders
- **Events & Calendar**: School events management

### 3.7 Additional Systems

- **Discipline Management**: Incident tracking and resolution
- **Attendance Tracking**: Student and staff attendance
- **Document Management**: Storage and sharing of important files
- **Support Ticketing**: Technical support request management

## 4. User Roles & Permissions

### 4.1 Primary Roles

- **super_admin**: Platform-level administrator (manages multiple schools)
- **school_admin**: School-level administrator
- **dos**: Director of Studies (academic administration)
- **teacher**: Classroom instructors
- **student**: Learners enrolled in the system
- **parent**: Guardians linked to students
- **accountant**: Financial management staff
- **librarian**: Library management
- **kitchen_staff**: Cafeteria/meals management
- **groundsman**: Facilities management
- **support_staff**: General administrative support
- **board_member**: School governance

### 4.2 Role-Based Access Control

- Granular permissions based on role combinations
- Resource-level access restrictions (e.g., school_admin can only access their own school data)
- Feature-based permissions (e.g., only accountants can generate invoices)

## 5. Key Frontend Interfaces

---

## 4. Detailed Schema Reference

### 6.1 Responsive Design

- The application must work seamlessly on:
  - Desktop computers (administrative staff)
  - Tablets (teachers during class)
  - Mobile phones (students and parents)

### 6.2 Accessibility

- Color contrast ratios for readability
- Screen reader compatibility
- Keyboard navigation support
- Text size adjustments

### 6.3 Data Visualization

- Academic performance charts
- Financial reports and graphs
- Attendance statistics
- System usage analytics

### 6.4 Design System Components

- Form elements (consistent inputs, dropdowns, date pickers)
- Navigation patterns (sidebar, breadcrumbs, tabs)
- Data tables with sorting, filtering, pagination
- Cards for displaying entity information
- Modal dialogs for quick actions
- Alert and notification styles

## 7. Integration Points

### 7.1 API Integration

- RESTful API endpoints available for all functionality
- WebSocket connection for real-time features (chat, notifications)
- JWT authentication headers required for protected routes
- OAuth flow for Google authentication

### 7.2 Third-Party Services

- Google OAuth for authentication
- Email service integration
- Payment gateway integration (M-Pesa, Stripe)
- Cloud storage for documents and media

## 8. Design Priorities

1. **Intuitive Navigation**: Clear pathways for different user roles
2. **Simplified Workflows**: Multi-step processes broken down into manageable segments
3. **Data Visualization**: Clear presentation of complex academic and financial data
4. **Mobile Accessibility**: Core functions available on all devices
5. **Consistent Experience**: Unified design language across all modules

## 9. Getting Started for Designers

1. Begin with user flows for the authentication process
2. Focus on the core dashboards for each primary user role
3. Develop the main academic interfaces (classes, subjects, assessments)
4. Design the communication tools (chat, announcements)
5. Create financial management screens

## 10. API Documentation

The API is built using NestJS and follows RESTful principles. You can access the complete API documentation at `/docs` when running the server. This Swagger-based documentation includes all endpoints, request/response schemas, and authentication requirements.

Key API routes include:

- `POST /api/v1/auth/register`: User registration
- `POST /api/v1/auth/login`: User authentication
- `GET /api/v1/auth/profile`: Get authenticated user profile
- `GET /api/v1/schools`: List available schools
- `GET /api/v1/classes`: List classes (filtered by school)
- `POST /api/v1/assessments`: Create new assessment records

## 11. Contact & Support

For technical questions related to the API functionality, please contact:

- Lead Developer: Eng Johnson Mwangi
- Project Management: JOMULTD Team
- Email: jomulimited2@gmail.com

---

This README provides a comprehensive overview of the CBC School Management System API to guide the design of an effective and user-friendly frontend. The design should focus on creating intuitive workflows that match the sophisticated functionality of the backend system while maintaining accessibility and responsiveness across different devices.

#### `meetingTable`, `meetingAgendaItemTable`, `meetingMinutesTable`, `actionItemTable`

- **Purpose:** Provides a full-featured system for managing formal meetings.
- **Functionality:** From scheduling and setting an agenda to recording minutes and assigning trackable action items with due dates. This creates an auditable record of all decisions.

#### `consentRequestTable` & `consentResponseTable`

- **Purpose:** Digitizes the process of obtaining parental consent for events like school trips.
- **Functionality:** Admins create a request, which sends notifications to relevant parents. Parents can approve or deny directly in the app. Admins get a real-time dashboard of responses.

### 4.4. Security & Auditing

#### `auditLogTable`

- **Purpose:** The system's immutable ledger. Provides a non-repudiable record of all significant actions.
- **Key Columns:** `user_id` (who), `action` (what), `table_name` & `record_pk` (on what), `old_data` & `new_data` (the change), `ip_address` (where), `created_at` (when).
- **Usage:** This table should be written to by application-level middleware/triggers after every critical CUD operation.

#### `userSessionTable`

- **Purpose:** Manages active user login sessions.
- **Functionality:** Allows a user (or admin) to see all devices where they are currently logged in and provides the ability to remotely log out a specific session.

#### `apiKeyTable`

- **Purpose:** For secure, programmatic access to our API (e.g., for future mobile apps or third-party integrations).
- **Security:** We only store a hash of the API key, not the key itself.

#### `passwordHistoryTable`

- **Purpose:** Prevents users from reusing their recent passwords, increasing account security.

---

### 5.1 Authentication Screens

- Login (Email/Password)
- Google OAuth Login
- Registration
- Password Reset
- Two-Factor Authentication

### 5.2 Dashboards

- **Admin Dashboard**: School performance metrics, alerts, quick actions
- **Teacher Dashboard**: Classes, assignments, attendance, upcoming events
- **Student Dashboard**: Timetable, assignments due, grades, announcements
- **Parent Dashboard**: Children's performance, fees, communication

### 5.3 Academic Interfaces

- **Class Management**: Class lists, student performance, attendance
- **Subject Planning**: Curriculum mapping, resource allocation
- **Assessment Entry**: Grade input, competency tracking, report generation
- **Timetable View**: Weekly schedule with filters (teacher, class, venue)

### 5.4 LMS Interfaces

- **Course Creator**: Structured content development tools
- **Student Learning Portal**: Access to courses, materials, assignments
- **Assignment Submission**: File upload, online text entry, feedback
- **Quiz System**: Question creation, attempt tracking, results

### 5.5 Financial Interfaces

- **Fee Configuration**: Grade-level fee structure setup
- **Invoice Management**: Generation, tracking, reporting
- **Payment Processing**: Record payments, generate receipts
- **Financial Dashboard**: Income tracking, outstanding balances, projections

### 5.6 Communication Tools

- **Chat Interface**: One-on-one and group messaging
- **Announcement System**: Create, target, and track announcements
- **Notification Center**: All system alerts in one place
- **Calendar & Events**: Visual calendar with event details

## 6. Technical Considerations for Design
