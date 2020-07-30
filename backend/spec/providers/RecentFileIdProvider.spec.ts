import { RecentFile } from '@entities/project/RecentFile';
import path from 'path';
import RecentFileIdProvider from 'src/providers/RecentFileIdProvider';

describe('RecentFileIdProvider', () => {

    const projectId: string = "testName";
    const file: string = "translation.json";

    beforeAll((done) => {
        done();
    });

    it(`should add recent file when projectId exists`, (done) => {
        const recentFile: RecentFile = new RecentFile(file, path.basename(file), projectId);
        RecentFileIdProvider.add(file, projectId);

        expect(RecentFileIdProvider.getAll()).toEqual([recentFile]);
        done();
    });

    it(`should add recent file when current recent file already exists`, (done) => {
        const recentFile: RecentFile = new RecentFile(file, path.basename(file), projectId);
        RecentFileIdProvider.add(file, projectId);
        RecentFileIdProvider.add(file, projectId);

        expect(RecentFileIdProvider.getAll()).toEqual([recentFile]);
        done();
    });
 });