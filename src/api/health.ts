import { http } from './http'

export const getHealth = () => http('health')
