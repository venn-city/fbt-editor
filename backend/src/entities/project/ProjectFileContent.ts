import ProjectFileItem from "./ProjectFileItem";

export class ProjectFileContent {
  constructor(
    public projectId: string,
    public targetLanguage: string,
    public fileId: string,
    public projectFileItems: ProjectFileItem[]
  ) {}
}
export default ProjectFileContent;
