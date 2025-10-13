import { http } from './http'

export const listNotifications = () => http('notifications')
export const markNotificationRead = (id: string | number) => http(`notifications/${id}/read`, { method: 'POST' })
