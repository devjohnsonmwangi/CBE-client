export interface CreateAcademicYearDto {
  school_id: number;
  year_name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
}

export type UpdateAcademicYearDto = Partial<CreateAcademicYearDto>;
