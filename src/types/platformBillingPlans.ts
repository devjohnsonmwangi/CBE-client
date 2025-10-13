export interface PlanFeaturesDto {
  canUseLms: boolean;
  maxStudents: number;
  supportLevel: 'basic' | 'priority';
  canUseAdvancedReports: boolean;
}

export interface CreatePlanDto {
  name: string;
  description?: string;
  monthly_price?: string; // decimal string, e.g. "100.00"
  yearly_price?: string; // decimal string
  features: PlanFeaturesDto;
  is_active?: boolean;
}

export interface UpdatePlanDto extends Partial<CreatePlanDto> {}
