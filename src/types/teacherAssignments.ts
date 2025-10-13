export interface CreateTeacherAssignmentDto {
  teacher_id: number;
  subject_id: number;
  class_id: number;
}

export type UpdateTeacherAssignmentDto = Partial<CreateTeacherAssignmentDto>;
