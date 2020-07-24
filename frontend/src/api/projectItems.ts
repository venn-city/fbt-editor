import {
  CreateItemRequest,
  DeleteItemRequest,
  ProjectItem,
} from "../store/entities";
import { getAPIPath, postFormData, request } from "./core";

export const fetchProjectItems = (
  projectId: string,
  folderId: string
): Promise<ProjectItem[]> => {
  const params = folderId ? { folderId } : {};

  return request<ProjectItem[]>(getAPIPath(`project-items/${projectId}`), {
    method: "GET",
    params,
  });
};

export const createProjectItem = (
  createItemRequest: CreateItemRequest
): Promise<void> =>
  request(getAPIPath(`project-items`), {
    method: "POST",
    data: createItemRequest,
  });

export const uploadSourceFile = (formData: FormData) => {
  postFormData(getAPIPath(`project-items/upload`), formData);
};

export const deleteProjectItem = (
  deleteItemRequest: DeleteItemRequest
): Promise<void> =>
  request<void>(getAPIPath(`project-items`), {
    method: "DELETE",
    data: deleteItemRequest,
  });
