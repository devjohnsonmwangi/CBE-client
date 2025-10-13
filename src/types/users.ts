export type SchoolRole = string;

export interface CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
  roles?: SchoolRole[];
  school_id?: number;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password' | 'email' | 'school_id'>>;
