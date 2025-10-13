export interface CreateSubjectRequirementDto {
  term_id: number;
  class_id: number;
  subject_id: number;
  lessons_per_week: number;
  requires_specific_venue_type?: string;
  is_double_period?: boolean;
}

export type UpdateSubjectRequirementDto = Partial<CreateSubjectRequirementDto>;
