export type GradeLevel = string;

export interface CreateClassDto {
  school_id: number;
  grade_level: GradeLevel;
  stream_name?: string;
  class_teacher_id?: number;
}

export type UpdateClassDto = Partial<CreateClassDto>;
