import { http } from './http'
import type { CreateInvoiceDto, UpdateInvoiceDto } from '../types'

export const listInvoices = () => http('invoices')
export const getInvoice = (id: string | number) => http(`invoices/${id}`)
export const createInvoice = (payload: CreateInvoiceDto) => http('invoices', { method: 'POST', body: JSON.stringify(payload) })
export const updateInvoice = (id: string | number, payload: UpdateInvoiceDto) => http(`invoices/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
