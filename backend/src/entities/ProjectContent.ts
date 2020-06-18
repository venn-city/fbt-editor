import { ProjectItem } from './ProjectItem';

export class ProjectContent {
    constructor(public projectName: string, public items: ProjectItem[]) {       
    }
}
export default ProjectContent;