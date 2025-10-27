// Consolidated types file

// Auth / backend minimal types
export interface LoginDto {
  email: string
  password: string
}

// Users
export type SchoolRole = string
export interface CreateUserDto {
  full_name: string
  email: string
  password: string
  phone_number?: string
  roles?: SchoolRole[]
  school_id?: number
}
export type UpdateUserDto = Partial<
  Omit<CreateUserDto, 'password' | 'email' | 'school_id'>
>

// Students
export type Gender = string
export interface CreateStudentDto {
  school_id: number
  admission_number: string
  upi?: string
  user_id?: number
  date_of_birth?: string // YYYY-MM-DD
  gender?: Gender
}
export type UpdateStudentDto = Partial<CreateStudentDto>

// Schools
export interface CreateSchoolDto {
  name: string
  address?: string
  phone?: string
}
export interface UpdateSchoolDto extends Partial<CreateSchoolDto> {}

// Classes
export type GradeLevel = string
export interface CreateClassDto {
  school_id: number
  grade_level: GradeLevel
  stream_name?: string
  class_teacher_id?: number
}
export type UpdateClassDto = Partial<CreateClassDto>

// Venues
export interface CreateVenueDto {
  school_id: number
  name: string
  capacity?: number
}
export type UpdateVenueDto = Partial<CreateVenueDto>

// Terms / Academic Years
export interface CreateAcademicYearDto {
  school_id: number
  year_name: string
  start_date: string // YYYY-MM-DD
  end_date: string // YYYY-MM-DD
}
export type UpdateAcademicYearDto = Partial<CreateAcademicYearDto>

export interface CreateTermDto {
  academic_year_id: number
  term_name: string
  start_date: string // YYYY-MM-DD
  end_date: string // YYYY-MM-DD
}
export type UpdateTermDto = Partial<CreateTermDto>

// Timetable slots / timetables
export interface CreateTimetableSlotDto {
  school_id: number
  day_of_week: number // 1-7
  start_time: string // HH:MM
  end_time: string // HH:MM
}
export type UpdateTimetableSlotDto = Partial<CreateTimetableSlotDto>

export interface CreateLessonDto {
  timetable_version_id: number
  slot_id: number
  class_id: number
  subject_id: number
  teacher_id: number
  venue_id?: number
}

export interface CreateTimetableVersionDto {
  term_id: number
  name: string
  description?: string
  timetable_type?: TimetableType
}
export interface UpdateTimetableVersionDto
  extends Partial<CreateTimetableVersionDto> {}

// Courses, modules, lesson contents
export interface CreateCourseDto {
  subject_id: number
  teacher_id: number
  title: string
  description?: string
  academic_year_id?: number
}
export type UpdateCourseDto = Partial<CreateCourseDto>

export interface CreateCourseModuleDto {
  course_id: number
  title: string
  order: number
}
export type UpdateCourseModuleDto = Partial<CreateCourseModuleDto> & {
  course_id?: never
}

export interface CreateLessonContentDto {
  module_id: number
  title: string
  content_type: string
  content_url?: string
  content_text?: string
  order: number
}
export type UpdateLessonContentDto = Partial<CreateLessonContentDto> & {
  module_id?: never
}

export interface MarkProgressDto {
  student_id: number
  is_completed: boolean
}

// Assignments, submissions
export interface CreateAssignmentDto {
  content_id: number
  instructions: string
  due_date?: string // ISO
  max_points?: number
}
export type UpdateAssignmentDto = Partial<CreateAssignmentDto>

export interface CreateSubmissionDto {
  assignment_id: number
  student_id: number
  submission_url: string
}

// Assessments
export type AssessmentType = string
export interface CreateAssessmentDto {
  term_id: number
  student_id: number
  subject_id: number
  teacher_id: number
  assessment_type: AssessmentType
  assessment_title?: string
  strand?: string
  sub_strand?: string
  learning_outcome?: string
  performance_level?: string
  score?: string // decimal as string per backend
  teacher_comments?: string
  assessment_date?: string // YYYY-MM-DD
}
export type UpdateAssessmentDto = Partial<CreateAssessmentDto>

// Quizzes
export interface CreateOptionDto {
  option_text: string
  is_correct: boolean
}
export interface CreateQuestionDto {
  quiz_id: number
  question_text: string
  question_type: string
  order: number
  options?: CreateOptionDto[]
}
export interface CreateQuizDto {
  title: string
}
export interface SubmitAnswersDto {
  quizId: number
  answers: Record<string, any>
}

// Announcements
export interface CreateAnnouncementDto {
  title: string
  body: string
  audience_type: string
  audience_specifier?: (string | number)[]
  channels: string[]
  scheduled_for?: string // ISO 8601
}
export type UpdateAnnouncementDto = Partial<CreateAnnouncementDto>
export interface GetReceiptsQueryDto {
  page?: number
  limit?: number
}

// Event reminders
export interface CreateEventReminderDto {
  minutes_before: number
  channels: string[]
}

// Chat
export interface SendMessageDto {
  conversationId: number
  content: string
}
export interface ReadMessageDto {
  conversationId: number
}
export interface CreateConversationDto {
  title?: string
  isGroupChat?: boolean
  schoolId?: number
  participantIds: number[]
}
export interface ChatbotQueryDto {
  query: string
  schoolId?: number
}

// Billing / payments / invoices / platform billing
export interface CreateInvoiceDto {
  studentId?: number
  amount: number
  dueDate?: string
  description?: string
}
export interface UpdateInvoiceDto extends Partial<CreateInvoiceDto> {
  paid?: boolean
}

export interface CreatePaymentDto {
  amount: number
  method?: string
  reference?: string
  invoiceId?: number
}

export interface CreatePlatformInvoiceDto {
  amount: number
  description?: string
  metadata?: Record<string, any>
}
export interface UpdatePlatformInvoiceDto
  extends Partial<CreatePlatformInvoiceDto> {
  paid?: boolean
}
export interface CreatePlatformPaymentDto {
  amount: number
  provider?: string
  reference?: string
}

export interface PlanFeaturesDto {
  canUseLms: boolean
  maxStudents: number
  supportLevel: 'basic' | 'priority'
  canUseAdvancedReports: boolean
}
export interface CreatePlanDto {
  name: string
  description?: string
  monthly_price?: string
  yearly_price?: string
  features: PlanFeaturesDto
  is_active?: boolean
}
export type UpdatePlanDto = Partial<CreatePlanDto>

export interface CreatePlatformSubscriptionDto {
  school_id: number
  plan_id: number
  status: SubscriptionStatus
  current_period_start: string
  current_period_end: string
  trial_end_date?: string
}
export interface UpdatePlatformSubscriptionDto {
  status?: SubscriptionStatus
  current_period_start?: string
  current_period_end?: string
  canceled_at?: string
}

// Compatibility aliases (some modules import these names)
export type CreateSubscriptionDto = CreatePlatformSubscriptionDto
export type UpdateSubscriptionDto = UpdatePlatformSubscriptionDto

// Subjects
export interface CreateSubjectDto {
  school_id: number
  subject_name: string
  subject_code?: string
}
export type UpdateSubjectDto = Partial<CreateSubjectDto>

// Fee structures
export interface CreateFeeStructureDto {
  title: string
  description?: string
  amount: number
  currency?: string
}
export interface UpdateFeeStructureDto extends Partial<CreateFeeStructureDto> {}

// Subject requirements
export interface CreateSubjectRequirementDto {
  term_id: number
  class_id: number
  subject_id: number
  lessons_per_week: number
  requires_specific_venue_type?: string
  is_double_period?: boolean
}
export type UpdateSubjectRequirementDto = Partial<CreateSubjectRequirementDto>

// Teacher assignments / preferences
export interface CreateTeacherAssignmentDto {
  teacher_id: number
  subject_id: number
  class_id: number
}
export type UpdateTeacherAssignmentDto = Partial<CreateTeacherAssignmentDto>

export interface PreferenceDto {
  slot_id: number
  status: AvailabilityStatus
}
export interface SetTeacherPreferencesDto {
  teacher_id: number
  term_id: number
  preferences: PreferenceDto[]
}
export type GetTeacherPreferencesResult = any

// Enrollment
export interface CreateEnrollmentDto {
  student_id: number
  class_id: number
  academic_year_id: number
  status?: string
}
export type UpdateEnrollmentDto = Partial<CreateEnrollmentDto>

// Link parent
export interface LinkParentDto {
  parent_user_id: number
}

// Lesson grading
export interface GradeSubmissionDto {
  grade: string
  feedback?: string
}

// School configurations
export interface MpesaCredentialsDto {
  consumerKey: string
  consumerSecret: string
  passKey: string
  shortCode: string
  environment: 'sandbox' | 'live'
}
export interface StripeCredentialsDto {
  secretKey: string
  webhookSecret: string
}
export interface UpdateConfigurationDto {
  mpesa_credentials?: MpesaCredentialsDto
  stripe_credentials?: StripeCredentialsDto
  default_payment_gateway?: string
}

// Enums and unions
export type AvailabilityStatus = 'preferred' | 'available' | 'unavailable'
export type TimetableType = 'lesson' | 'exam' | 'event'
export type TimetableStatus = 'draft' | 'published' | 'archived'
export type GenderEnum = 'male' | 'female' | 'other'
export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'partially_paid'
  | 'failed'
  | 'refunded'
export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
export type PlanInterval = 'month' | 'year'
export type SchoolRoleEnum =
  | 'super_admin'
  | 'school_admin'
  | 'dos'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'librarian'
  | 'kitchen_staff'
  | 'groundsman'
  | 'support_staff'
  | 'board_member'
export type EnrollmentStatus =
  | 'active'
  | 'graduated'
  | 'withdrawn'
  | 'suspended'
export type PaymentGateway = 'mpesa' | 'bank_transfer' | 'stripe' | 'cash'
export type AssessmentTypeEnum =
  | 'formative'
  | 'summative'
  | 'project'
  | 'portfolio_review'
export type EventType =
  | 'parent_teacher_meeting'
  | 'sports_day'
  | 'school_trip'
  | 'exam_period'
  | 'holiday'
  | 'general_announcement'
  | 'board_meeting'
export type DocumentCategory =
  | 'academic'
  | 'portfolio'
  | 'medical'
  | 'legal'
  | 'general'
  | 'consent_form'
export type NotificationType =
  | 'new_chat_message'
  | 'event_reminder'
  | 'new_assessment_grade'
  | 'fee_due_reminder'
  | 'payment_confirmation'
  | 'new_report_card'
  | 'new_invoice'
  | 'discipline_incident'
  | 'consent_request'
  | 'meeting_minute_published'
  | 'general_announcement'
  | 'new_assignment'
  | 'quiz_due'
export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'ARCHIVE'
  | 'RESTORE'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAIL'
  | 'VIEW'
  | '2FA_ENABLED'
  | '2FA_DISABLED'
export type GroupType =
  | 'club'
  | 'sport_team'
  | 'dormitory'
  | 'house'
  | 'committee'
export type LeadershipScope =
  | 'school_wide'
  | 'grade_level'
  | 'class_level'
  | 'group_level'
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'
export type IncidentStatus =
  | 'reported'
  | 'under_investigation'
  | 'action_taken'
  | 'resolved'
  | 'closed'
export type PositionType =
  | 'academic_leadership'
  | 'administrative_leadership'
  | 'pastoral_care'
export type DepartmentType = 'academic' | 'administrative' | 'support'
export type MeetingStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'postponed'
export type ConsentStatus = 'pending' | 'granted' | 'denied'
export type GradeLevelEnum =
  | 'pp1'
  | 'pp2'
  | 'grade_1'
  | 'grade_2'
  | 'grade_3'
  | 'grade_4'
  | 'grade_5'
  | 'grade_6'
  | 'grade_7'
  | 'grade_8'
  | 'grade_9'
  | 'grade_10'
  | 'grade_11'
  | 'grade_12'
export type ContentType = 'video' | 'pdf' | 'text' | 'assignment' | 'quiz'
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer'
export type PlatformInvoiceStatus =
  | 'draft'
  | 'open'
  | 'paid'
  | 'uncollectible'
  | 'void'
export type AnnouncementChannel = 'dashboard' | 'email' | 'sms'
export type AnnouncementAudience =
  | 'all_users'
  | 'all_staff'
  | 'all_parents'
  | 'all_students'
  | 'specific_roles'
  | 'specific_grades'
  | 'specific_classes'
  | 'specific_groups'
  | 'specific_users'
export type ReminderStatus = 'pending' | 'sent' | 'failed'

// (All backend types have been consolidated into this file.)

// Auth store types
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SCHOOL_ADMIN = 'school_admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
  CUSTOMER = 'customer',
}

export interface User {
  email: string
  username: string
  // Optional human-friendly full name
  full_name?: string
  id: string
  role: UserRole
  // If backend provides multiple roles, include them here
  roles?: string[]
  // Optional profile picture URL returned by the backend (google or uploaded)
  profile_picture?: string | null
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface globalDataType {
  isVerified: boolean
  tokens: Tokens
  user: User
}
