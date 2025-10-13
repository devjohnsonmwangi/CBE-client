export interface CreateCourseModuleDto {
  title: string;
  courseId?: number;
  content?: string;
}

export interface UpdateCourseModuleDto extends Partial<CreateCourseModuleDto> {}
