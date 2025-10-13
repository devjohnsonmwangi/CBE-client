import { http } from './http'
import type { CreatePlanDto, UpdatePlanDto } from '../types'

export const listPlans = () => http('platform-billing/plans')
export const getPlan = (id: string | number) => http(`platform-billing/plans/${id}`)
export const createPlan = (payload: CreatePlanDto) => http('platform-billing/plans', { method: 'POST', body: JSON.stringify(payload) })
export const updatePlan = (id: string | number, payload: UpdatePlanDto) => http(`platform-billing/plans/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
