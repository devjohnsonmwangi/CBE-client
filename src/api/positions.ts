import { http } from './http'

export const listPositions = () => http('positions')
