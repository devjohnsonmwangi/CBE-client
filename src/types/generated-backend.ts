// Auto-generated frontend shapes mapped from backend DTO classes (subset). Add more as needed.

export interface LoginDto { email: string; password: string }

export interface CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
  roles?: string[];
  school_id?: number;
}
export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password' | 'email' | 'school_id'>>;

export interface CreateStudentDto {
  school_id: number;
  admission_number: string;
  upi?: string;
  user_id?: number;
  date_of_birth?: string; // YYYY-MM-DD
  gender?: string;
}

export interface CreateVenueDto {
  school_id: number;
  name: string;
  capacity?: number;
}

export interface CreateTermDto {
  academic_year_id: number;
  term_name: string;
  start_date: string;
  end_date: string;
}

export interface CreateTimetableSlotDto {
  school_id: number;
  day_of_week: number;
  start_time: string; // HH:MM
  end_time: string; // HH:MM
}

export interface CreateCourseDto {
  subject_id: number;
  teacher_id: number;
  title: string;
  description?: string;
  academic_year_id?: number;
}

export interface CreateAssignmentDto {
  content_id: number;
  instructions: string;
  due_date?: string;
  max_points?: number;
}

export interface CreateAssessmentDto {
  term_id: number;
  student_id: number;
  subject_id: number;
  teacher_id: number;
  assessment_type: string;
  assessment_title?: string;
  strand?: string;
  sub_strand?: string;
  learning_outcome?: string;
  performance_level?: string;
  score?: string;
  teacher_comments?: string;
  assessment_date?: string;
}

export interface CreateAcademicYearDto {
  school_id: number;
  year_name: string;
  start_date: string;
  end_date: string;
}
