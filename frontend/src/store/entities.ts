export interface Item {
  fileId: string
  id: string;
  name: string;
  projectId: string;
  readonly: string;
}

export interface Project extends Item {
  description: string;
  onItemClick: (item: string) => void;
}

export interface ProjectItem extends Item {
  type: ProjectItemType,
}

export interface RecentFile extends Item {
}

export interface ProjectFileItem {
  id: string;
  source: string;
  description: string;
  target: string;
  targetLanguage: string;
}

export interface ProjectFileContent {
  projectId: string,
  targetLanguage: string,
  fileId: string,
  projectFileItems: ProjectFileItem[]
}

export enum ProjectItemType {
  File = 'File',
  Folder = 'Folder'
}

export interface CreateItemRequest {
  projectId: string,
  parentFolderId: string,
  name: string,
  targetLanguage: string
}

export interface DeleteItemRequest {
  projectId: string,
  itemId: string;
}

export interface UpdateFileItemData {
  id: string,
  value: string;
}

