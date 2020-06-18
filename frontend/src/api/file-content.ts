import { getAPIPath, request } from './core'

export const fetchFileContent = (projectId: string, fileId: string) => request(
  getAPIPath(`project-item-content/${projectId}?fileId=${fileId}`),
  { method: 'GET', params: {} },
)
export const updateFileContent = (
  projectId: string,
  fileId: string,
  targetLanguage: string,
  projectFileItems: object,
) => request(
  getAPIPath(`project-item-content`),
  {
    method: 'PUT',
    data: {
      fileId,
      targetLanguage,
      projectFileItems,
      projectName: projectId,
    },
  },
)
