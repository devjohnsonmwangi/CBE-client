import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/billing'

export function useInvoices(params?: Record<string, any>) {
  return useQuery({ queryKey: ['invoices', params || {}], queryFn: () => api.listInvoices(params) })
}

export function useCreatePayment() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.createPayment(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['invoices'] }) })
}
