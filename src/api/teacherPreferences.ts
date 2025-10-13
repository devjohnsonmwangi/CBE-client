import { http } from './http'
import type { SetTeacherPreferencesDto } from '../types'

export const getTeacherPreferences = (teacherId?: string | number) => http(teacherId ? `teacher-preferences/${teacherId}` : 'teacher-preferences')
export const setTeacherPreferences = (payload: SetTeacherPreferencesDto) => http('teacher-preferences', { method: 'POST', body: JSON.stringify(payload) })
