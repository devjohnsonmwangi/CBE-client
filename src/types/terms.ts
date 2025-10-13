export interface CreateTermDto {
  academic_year_id: number;
  term_name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
}

export type UpdateTermDto = Partial<CreateTermDto>;
