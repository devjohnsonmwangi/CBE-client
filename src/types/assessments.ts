export type AssessmentType = string;

export interface CreateAssessmentDto {
  term_id: number;
  student_id: number;
  subject_id: number;
  teacher_id: number;
  assessment_type: AssessmentType;
  assessment_title?: string;
  strand?: string;
  sub_strand?: string;
  learning_outcome?: string;
  performance_level?: string;
  score?: string; // decimal as string per backend
  teacher_comments?: string;
  assessment_date?: string; // YYYY-MM-DD
}

export type UpdateAssessmentDto = Partial<CreateAssessmentDto>;
