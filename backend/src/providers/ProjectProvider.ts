import projectsCache from 'src/cache/ProjectsCache';
import ProjectConfiguration from '@entities/ProjectConfiguration';
import _ from 'lodash';

export default class ProjectProvider {

    public getAllProjects(): ProjectConfiguration[] {
        return projectsCache.getProjectsConfiguration();
    }

    public getProject(projectName: string): ProjectConfiguration | null {
        var projects = this.getAllProjects();
        var filterdProjects: ProjectConfiguration[] = _.filter(projects, (projectConfiguration: ProjectConfiguration) => projectConfiguration.projectName === projectName)
        if(_.some(filterdProjects)) {
            return filterdProjects[0];
        }
        return null;
    }

    public getSourceFileName(projectName: string): string {
        return this.getProject(projectName)!.sourceFileName;
    } 
}