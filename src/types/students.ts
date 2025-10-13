export type Gender = string;

export interface CreateStudentDto {
  school_id: number;
  admission_number: string;
  upi?: string;
  user_id?: number;
  date_of_birth?: string; // YYYY-MM-DD
  gender?: Gender;
}

export type UpdateStudentDto = Partial<CreateStudentDto>;
