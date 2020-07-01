import ProjectConfiguration from '@entities/ProjectConfiguration';
import _ from 'lodash';
import projectsCache from 'src/cache/ProjectsCache';

export default class ProjectProvider {

    public getAllProjects(): ProjectConfiguration[] {
        return projectsCache.getProjectsConfiguration();
    }

    public getProject(projectId: string): ProjectConfiguration {
        const projects = this.getAllProjects();
        const filterdProjects: ProjectConfiguration[] = _.filter(
            projects,
            (projectConfiguration: ProjectConfiguration) => projectConfiguration.projectName === projectId);
        if(_.some(filterdProjects)) {
            return filterdProjects[0];
        }
        throw new Error(`Project (${projectId}) does not exist!`);
    }

    public getSourceFileName(projectId: string): string {
        return this.getProject(projectId).sourceFileName;
    }

    public getBucketName(projectId: string): string {
        return this.getProject(projectId).bucketName;
    }
}