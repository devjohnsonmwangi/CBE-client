export interface CreateSubjectDto {
  school_id: number;
  subject_name: string;
  subject_code?: string;
}

export type UpdateSubjectDto = Partial<CreateSubjectDto>;
