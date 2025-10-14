import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as feeApi from '../api/feeStructures'
import type { CreateFeeStructureDto, UpdateFeeStructureDto } from '../types'

export function useFeeStructures() {
  return useQuery({ queryKey: ['feeStructures'], queryFn: () => feeApi.listFeeStructures() })
}

export function useCreateFeeStructure() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateFeeStructureDto) => feeApi.createFeeStructure(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feeStructures'] }),
  })
}

export function useUpdateFeeStructure() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateFeeStructureDto }) =>
      feeApi.updateFeeStructure(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feeStructures'] }),
  })
}
