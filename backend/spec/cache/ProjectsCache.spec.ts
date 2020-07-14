import ProjectConfiguration from '@entities/ProjectConfiguration';
import AppSettingsCache from 'src/cache/AppSettingsCache';
import AppSettingsRepository from "src/repositories/ProjectRepository";

describe('ProjectsCache', () => {

    it(`should init cache with projects`, (done) => {

        const projectConfigurations = [
            new ProjectConfiguration("test", "test", "", "", "", "")
        ];

        spyOn(AppSettingsRepository.prototype, 'getProjectsConfiguration').and.returnValue(projectConfigurations);
        AppSettingsCache.init();
        const result = AppSettingsCache.getAppSettings();
        expect(result).toEqual(projectConfigurations);
        done();
    });
 });