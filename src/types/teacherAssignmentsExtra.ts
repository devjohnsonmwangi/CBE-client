export interface CreateTeacherAssignmentDto {
  teacherId: number;
  classId?: number;
  subjectId?: number;
}

export interface UpdateTeacherAssignmentDto extends Partial<CreateTeacherAssignmentDto> {}
