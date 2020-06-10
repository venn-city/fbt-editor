import ProjectFileItem from './ProjectFileItem';

export class ProjectFileContent {
    constructor(
        public projectName: string,
        public targetLanguage: string,
        public fileId: string,
        public projectFileItems: ProjectFileItem[]) {

    }
}
export default ProjectFileContent;