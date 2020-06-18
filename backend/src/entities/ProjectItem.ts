import BucketItemType from './ProjectItemType';

export abstract class ProjectItem {
    constructor(public id: string, public name: string, public type: BucketItemType, public readonly: boolean) {}
}
export default ProjectItem;