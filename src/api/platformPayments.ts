import { http } from './http'

export const createPlatformPayment = (payload: any) => http('platform-billing/platform-payments', { method: 'POST', body: JSON.stringify(payload) })
