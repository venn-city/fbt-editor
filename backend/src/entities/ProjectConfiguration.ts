export default class ProjectConfiguration {
    constructor(
        public projectName: string,
        public bucketName: string,
        public accessKeyId: string,
        public secretAccessKey: string,
        public region: string,
        public sourceFileName: string)
    {
    }
}