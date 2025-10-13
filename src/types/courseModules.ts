export interface CreateCourseModuleDto {
  course_id: number;
  title: string;
  order: number;
}

export type UpdateCourseModuleDto = Partial<CreateCourseModuleDto> & { course_id?: never };
