import { http } from './http'
import type { CreatePaymentDto } from '../types/payments'

export const createPayment = (payload: CreatePaymentDto) => http('payments', { method: 'POST', body: JSON.stringify(payload) })
export const listPayments = () => http('payments')
export const getPayment = (id: string | number) => http(`payments/${id}`)
