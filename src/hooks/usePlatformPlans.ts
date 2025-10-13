import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/platformPlans'
import type { CreatePlanDto, UpdatePlanDto } from '../types'

export function usePlatformPlans() {
  return useQuery({ queryKey: ['platformPlans'], queryFn: () => api.listPlans() })
}

export function useCreatePlan() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: CreatePlanDto) => api.createPlan(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['platformPlans'] }) })
}

export function useUpdatePlan() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, data }: { id: string | number; data: UpdatePlanDto }) => api.updatePlan(String(id), data), onSuccess: () => qc.invalidateQueries({ queryKey: ['platformPlans'] }) })
}
