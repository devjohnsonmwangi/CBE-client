import type { CreateFeeStructureDto, UpdateFeeStructureDto } from '../types/feeStructures'
import { http } from './http'

export const listFeeStructures = () => http(`/fee-structures`)

export const getFeeStructure = (id: string | number) => http(`/fee-structures/${id}`)

export const createFeeStructure = (payload: CreateFeeStructureDto) => http(`/fee-structures`, { method: 'POST', body: JSON.stringify(payload) })

export const updateFeeStructure = (id: string | number, payload: UpdateFeeStructureDto) => http(`/fee-structures/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })

export const deleteFeeStructure = (id: string | number) => http(`/fee-structures/${id}`, { method: 'DELETE' })
