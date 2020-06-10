export default class CreateItemRequest {
    constructor(
        public projectName: string,
        public parentFolderId: string,
        public name: string,
        public targetLanguage: string) {
        
    }
}