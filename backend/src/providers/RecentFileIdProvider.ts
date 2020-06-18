import _ from 'lodash';

class RecentFileIdProvider {
    private projectFileIds: string[] = [];

    public getAll(): string[] {
        return this.projectFileIds;
    }

    public add(projectFileId: string) {
        if (_.includes(this.projectFileIds, projectFileId)) {
            return;
        }
        this.projectFileIds.push(projectFileId);
    }
}

export default new RecentFileIdProvider();