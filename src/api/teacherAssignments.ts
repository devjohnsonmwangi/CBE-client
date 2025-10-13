import { http } from './http'

export const listTeacherAssignments = () => http('teacher-assignments')
export const createTeacherAssignment = (payload: any) => http('teacher-assignments', { method: 'POST', body: JSON.stringify(payload) })
