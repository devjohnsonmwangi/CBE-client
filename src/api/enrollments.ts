import { http } from './http'
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from '../types'

export const listEnrollments = (params?: Record<string, any>) => {
	const q = params ? `?${new URLSearchParams(params).toString()}` : ''
	return http(`enrollments${q}`)
}

export const getEnrollment = (id: string) => http(`enrollments/${id}`)
export const createEnrollment = (payload: CreateEnrollmentDto | any) => http('enrollments', { method: 'POST', body: JSON.stringify(payload) })
export const updateEnrollment = (id: string, payload: UpdateEnrollmentDto | any) => http(`enrollments/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
export const deleteEnrollment = (id: string) => http(`enrollments/${id}`, { method: 'DELETE' })
