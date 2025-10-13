import { http } from './http'
import type { CreateSubscriptionDto, UpdateSubscriptionDto } from '../types'

export const listSubscriptions = () => http('platform-billing/subscriptions')
export const createSubscription = (payload: CreateSubscriptionDto) => http('platform-billing/subscriptions', { method: 'POST', body: JSON.stringify(payload) })
export const updateSubscription = (id: string | number, payload: UpdateSubscriptionDto) => http(`platform-billing/subscriptions/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
