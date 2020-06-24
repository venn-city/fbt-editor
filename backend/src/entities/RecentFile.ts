import ProjectFile from './ProjectFile';

export class RecentFile extends ProjectFile {
    constructor(public id: string, public name: string, public projectId: string) {
        super(id, name, false);
    }
}
export default ProjectFile;