import { http } from './http'

export const getFinanceSummary = () => http('finance/summary')
