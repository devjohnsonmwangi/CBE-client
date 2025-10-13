import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as venuesApi from '../api/venues'

export function useVenues() {
  return useQuery({ queryKey: ['venues'], queryFn: () => venuesApi.listVenues() })
}

export function useCreateVenue() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (payload: any) => venuesApi.createVenue(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['venues'] }) })
}
