import { http } from './http'

export const listPlatformInvoices = () => http('platform-billing/platform-invoices')
export const createPlatformInvoice = (payload: any) => http('platform-billing/platform-invoices', { method: 'POST', body: JSON.stringify(payload) })
