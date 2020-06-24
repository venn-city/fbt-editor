import { ProjectItem } from './ProjectItem';

export class ProjectContent {
    constructor(public projectId: string, public items: ProjectItem[]) {
    }
}
export default ProjectContent;