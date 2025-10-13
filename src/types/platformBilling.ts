export interface PlanFeaturesDto {
  canUseLms: boolean;
  maxStudents: number;
  supportLevel: 'basic' | 'priority';
  canUseAdvancedReports: boolean;
}

export interface CreatePlanDto {
  name: string;
  description?: string;
  monthly_price?: string;
  yearly_price?: string;
  features: PlanFeaturesDto;
  is_active?: boolean;
}

export type UpdatePlanDto = Partial<CreatePlanDto>;
