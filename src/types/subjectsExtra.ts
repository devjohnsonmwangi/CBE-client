export interface CreateSubjectDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdateSubjectDto extends Partial<CreateSubjectDto> {}
