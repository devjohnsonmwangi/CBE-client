import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/platformSubscriptions'
import type { CreateSubscriptionDto, UpdateSubscriptionDto } from '../types'

export function usePlatformSubscriptions() {
  return useQuery({ queryKey: ['platformSubscriptions'], queryFn: () => api.listSubscriptions() })
}

export function useCreateSubscription() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: CreateSubscriptionDto) => api.createSubscription(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['platformSubscriptions'] }) })
}

export function useUpdateSubscription() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }: { id: string | number; data: UpdateSubscriptionDto }) => api.updateSubscription(String(id), data), onSuccess: () => qc.invalidateQueries({ queryKey: ['platformSubscriptions'] }) })
}
