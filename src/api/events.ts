import { http } from './http'

export const listEvents = () => http('events')
export const getEvent = (id: string | number) => http(`events/${id}`)
export const createEvent = (payload: any) => http('events', { method: 'POST', body: JSON.stringify(payload) })
