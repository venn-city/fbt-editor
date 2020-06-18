import BucketItemType from './ProjectItemType';
import { ProjectItem } from './ProjectItem';

export class ProjectFolder extends ProjectItem {
    constructor(public id: string, public name: string) {
        super(id, name, BucketItemType.Folder)
    }
}
export default ProjectFolder;