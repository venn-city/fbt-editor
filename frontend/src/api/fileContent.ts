import { ProjectFileContent } from "./../store/entities";
import { getAPIPath, request } from "./core";

export const fetchFileContent = (
  projectId: string,
  fileId: string
): Promise<ProjectFileContent> =>
  request(getAPIPath(`project-item-content/${projectId}?fileId=${fileId}`), {
    method: "GET",
    params: {},
  });

export const updateFileContent = (
  projectFileContent: ProjectFileContent
): Promise<void> =>
  request<void>(getAPIPath(`project-item-content`), {
    method: "PUT",
    data: projectFileContent,
  });
