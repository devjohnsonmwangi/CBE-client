export interface CreateSubjectRequirementDto {
  subjectId: number;
  requirement: string;
}

export interface UpdateSubjectRequirementDto extends Partial<CreateSubjectRequirementDto> {}
