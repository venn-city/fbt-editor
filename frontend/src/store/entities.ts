export interface Item {
  fileId: string;
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
  type: ProjectItemType;
}

export interface RecentFile extends Item {}

export interface ProjectFileItem {
  id: string;
  source: string;
  description: string;
  targetLanguage: string;
  tokens: TranslationSourceTokenItem[];
  translations: ProjectFileItemTranslation[];
}

export interface ProjectFileItemTranslation {
  translation: string;
  variations: { [key: number]: number };
}

export interface ProjectFileContent {
  projectId: string;
  targetLanguage: string;
  fileId: string;
  projectFileItems: ProjectFileItem[];
}

export interface TranslationSourceTokenItem {
  token: string;
  type: number;
  singular: boolean;
}

export enum ProjectItemType {
  File = "File",
  Folder = "Folder",
}

export interface CreateItemRequest {
  projectId: string;
  parentFolderId: string;
  name: string;
  targetLanguage: string;
}

export interface DeleteItemRequest {
  projectId: string;
  itemId: string;
}

export interface UpdateFileItemData {
  id: string;
  tokens: TokenData[];
  projectFileItemTranslation: ProjectFileItemTranslation;
}

export interface LoginUserRequest {
  tokenId: string;
  email: string;
}

export interface CurrentUser {
  tokenId: string;
  email: string;
  profileImageUrl: string;
  name: string;
}

export interface AuthClientData {
  clientId: string;
}

export interface TokenData {
  name: string;
  value: number;
  index: number;
  type: number;
  displayName: string;
  possibleValues: { [index: number]: string };
}

export interface TokenInfo {
  name: string;
  type: number;
  displayName: string;
  required: boolean;
}
