export interface CreateClassDto {
  name: string;
  year?: string;
}

export interface UpdateClassDto extends Partial<CreateClassDto> {}
