import { getAPIPath, request } from './core'

export const fetchProjectsList = () => request(
  getAPIPath(`projects`),
  { method: 'GET', params: {} },
)
