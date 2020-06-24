import { ProjectItem } from './ProjectItem';
import BucketItemType from './ProjectItemType';

export class ProjectFolder extends ProjectItem {
    constructor(public id: string, public name: string) {
        super(id, name, BucketItemType.Folder, false);
    }
}
export default ProjectFolder;