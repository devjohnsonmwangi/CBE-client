export interface CreateLessonContentDto {
  module_id: number;
  title: string;
  content_type: string;
  content_url?: string;
  content_text?: string;
  order: number;
}

export type UpdateLessonContentDto = Partial<CreateLessonContentDto> & { module_id?: never };

export interface MarkProgressDto {
  student_id: number;
  is_completed: boolean;
}
