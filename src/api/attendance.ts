import { http } from './http'

export const markAttendance = (payload: { class_id: number; date?: string; records: Array<{ student_id: number; status: string }> }) => {
  return http('attendance/mark', { method: 'POST', body: JSON.stringify(payload) })
}

export const getClassAttendance = (classId: number, date?: string) => {
  const q = date ? `?date=${encodeURIComponent(date)}` : ''
  return http(`attendance/class/${classId}${q}`)
}

export default { markAttendance, getClassAttendance }
