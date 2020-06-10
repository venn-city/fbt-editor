import { getAPIPath, request } from './core'

export const fetchFolders = (projectId: string, folderId: string) => {
  const params = folderId ? { folderId } : {}

  return request(
    getAPIPath(`project-items/${projectId}`),
    { method: 'GET', params, },
  )
}

export const createFolder = (projectId: string, parentFolderId: string, folderName: string, targetLanguage: string) => request(
  getAPIPath(`project-items`),
  {
    method: 'POST',
    data: {
      parentFolderId,
      name: folderName,
      projectName: projectId,
      targetLanguage: targetLanguage
    },
  },
)

export const deleteFolder = (projectId: string, folderName: string) => request(
  getAPIPath(`project-items`),
  {
    method: 'DELETE',
    data: {
      itemId: folderName,
      projectName: projectId,
    },
  },
)
