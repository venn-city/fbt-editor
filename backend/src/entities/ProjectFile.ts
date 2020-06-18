import BucketItemType from './ProjectItemType';
import { ProjectItem } from './ProjectItem';

export class ProjectFile extends ProjectItem {
    constructor(public id: string, public name: string) {
        super(id, name, BucketItemType.File)
    }
}
export default ProjectFile;