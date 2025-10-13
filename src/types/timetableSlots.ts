export interface CreateTimetableSlotDto {
  school_id: number;
  day_of_week: number; // 1-7
  start_time: string; // HH:MM
  end_time: string; // HH:MM
}

export type UpdateTimetableSlotDto = Partial<CreateTimetableSlotDto>;
