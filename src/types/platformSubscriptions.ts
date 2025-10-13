import type { SubscriptionStatus } from './enums';

export interface CreateSubscriptionDto {
  school_id: number;
  plan_id: number;
  status: SubscriptionStatus;
  current_period_start: string; // YYYY-MM-DD
  current_period_end: string; // YYYY-MM-DD
  trial_end_date?: string;
}

export interface UpdateSubscriptionDto {
  status?: SubscriptionStatus;
  current_period_start?: string;
  current_period_end?: string;
  canceled_at?: string;
}
