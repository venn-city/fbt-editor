import ProjectConfiguration from '@entities/ProjectConfiguration';
import ProjectsCache from 'src/cache/ProjectsCache';
import ProjectRepository from "src/repositories/ProjectRepository";

describe('ProjectsCache', () => {

    it(`should init cache with projects`, (done) => {

        const projectConfigurations = [
            new ProjectConfiguration("test", "test", "", "", "", "")
        ];

        spyOn(ProjectRepository.prototype, 'getProjectsConfiguration').and.returnValue(projectConfigurations);
        ProjectsCache.init();
        const result = ProjectsCache.getProjectsConfiguration();
        expect(result).toEqual(projectConfigurations);
        done();
    });
 });