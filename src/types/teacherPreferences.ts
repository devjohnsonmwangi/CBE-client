import type { AvailabilityStatus } from './enums'

export interface PreferenceDto {
  slot_id: number;
  status: AvailabilityStatus;
}

export interface SetTeacherPreferencesDto {
  teacher_id: number;
  term_id: number;
  preferences: PreferenceDto[];
}

export type GetTeacherPreferencesResult = any;
