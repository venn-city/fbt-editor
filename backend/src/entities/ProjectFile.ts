import { ProjectItem } from './ProjectItem';
import BucketItemType from './ProjectItemType';

export class ProjectFile extends ProjectItem {
    constructor(public id: string, public name: string, public readonly: boolean) {
        super(id, name, BucketItemType.File, readonly);
    }
}
export default ProjectFile;