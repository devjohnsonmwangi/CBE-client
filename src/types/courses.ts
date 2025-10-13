export interface CreateCourseDto {
  subject_id: number;
  teacher_id: number;
  title: string;
  description?: string;
  academic_year_id?: number;
}

export type UpdateCourseDto = Partial<CreateCourseDto>;
