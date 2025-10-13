export interface CreateLessonDto {
  timetable_version_id: number;
  slot_id: number;
  class_id: number;
  subject_id: number;
  teacher_id: number;
  venue_id?: number;
}

export interface CreateTimetableVersionDto {
  term_id: number;
  name: string;
  description?: string;
  timetable_type?: import('./enums').TimetableType;
}

export interface UpdateTimetableVersionDto extends Partial<CreateTimetableVersionDto> {}
