import { RecentFile } from '@entities/RecentFile';
import _ from 'lodash';
import path from 'path';

class RecentFileIdProvider {
    private readonly recentFiles: RecentFile[] = [];

    public getAll(): RecentFile[] {
        return this.recentFiles;
    }

    public add(fileId: string, projectId: string) {

        if (_.some(_.filter(this.recentFiles,
             (recentFile: RecentFile) => recentFile.projectId === projectId && recentFile.id === fileId))) {
            return;
        }
        this.recentFiles.push(new RecentFile(fileId, path.basename(fileId), projectId));
    }
}

export default new RecentFileIdProvider();