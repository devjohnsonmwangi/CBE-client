export interface CreateEnrollmentDto {
  student_id: number;
  class_id: number;
  academic_year_id: number;
  status?: string;
}

export type UpdateEnrollmentDto = Partial<CreateEnrollmentDto>;
