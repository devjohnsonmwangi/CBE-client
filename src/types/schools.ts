export interface CreateSchoolDto {
  name: string;
  address?: string;
  phone?: string;
}

export interface UpdateSchoolDto extends Partial<CreateSchoolDto> {}
