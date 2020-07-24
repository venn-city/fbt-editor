export default class CreateItemRequest {
  constructor(
    public projectId: string,
    public parentFolderId: string,
    public name: string,
    public targetLanguage: string
  ) {}
}
