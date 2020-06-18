import { last } from "ramda";

export const getCurrentFileName = (fileId: string): string|undefined => {
  return last(fileId.split('/'));
};

export const getProjectItemParentFolderPath = (projectItemId: string): string => {
  const path: string = getParentFolderPath(projectItemId);
  return path ? `&folderId=${path}/` : '';
};

export const getParentFolderPath = (projectItemId: string): string => {
  const folderIdPath = projectItemId.split('/').filter(Boolean);
  return `${folderIdPath.slice(0, folderIdPath.length - 1).join('/')}`;
};

export const getProjectPath = (projectId: string): string => {
  return `/project/${projectId}`;
};

export const getFolderPath = (folderId: string): string => {
  return `?folderId=${folderId}`;
};

export const getFilePath = (folderId: string): string => {
  return `?fileId=${folderId}`;
};