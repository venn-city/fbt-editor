export const onEntityClick = (projectId: string, search: string, method: any, additionalPath = '') => {
  method({
    search,
    pathname: `/project/${projectId}${additionalPath}`,
  });
};
export const onFolderClick = (projectId: string, folderId: string, method: any) => onEntityClick(projectId, `?folderId=${folderId}`, method);
export const onFileClick = (projectId: string, fileId: string, method: any) => onEntityClick(projectId, `?fileId=${fileId}`, method, '/file');