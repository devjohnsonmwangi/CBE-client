export interface CreateFeeStructureDto {
  title: string;
  description?: string;
  amount: number;
  currency?: string;
}

export interface UpdateFeeStructureDto extends Partial<CreateFeeStructureDto> {}
