import { getAPIPath, request } from './core'

export const fetchRecentFilesList = () => request(
  getAPIPath(`recent-files`),
  { method: 'GET', params: {} },
)
