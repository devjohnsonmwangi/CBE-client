// Auto-generated minimal frontend types mapped from backend DTOs and selects

export interface CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
  roles?: string[];
  school_id?: number;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password' | 'email' | 'school_id'>>;

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateStudentDto {
  school_id: number;
  admission_number: string;
  upi?: string;
  user_id?: number;
  date_of_birth?: string; // YYYY-MM-DD
  gender?: string;
}

export interface CreateVenueDto {
  name: string;
  description?: string;
  capacity?: number;
  school_id: number;
}

export interface CreateTermDto {
  academic_year_id: number;
  start_date: string; // ISO date
  end_date: string; // ISO date
  term_name: string;
}

export interface CreateTimetableSlotDto {
  school_id: number;
  day_of_week: number;
  start_time: string; // e.g. "08:00"
  end_time: string; // e.g. "09:00"
}
