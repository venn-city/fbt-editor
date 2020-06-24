import ProjectConfiguration from '@entities/ProjectConfiguration';
import cache from 'memory-cache';
import ProjectRepository from 'src/repositories/ProjectRepository';

class ProjectsCache {
    private readonly projectsConfiguration: string = "projectsConfiguration";
    private readonly projectRepository: ProjectRepository = new ProjectRepository();

    public init() {
        cache.put(this.projectsConfiguration, this.projectRepository.getProjectsConfiguration());
    }

    public getProjectsConfiguration() {
        return cache.get(this.projectsConfiguration) as ProjectConfiguration[];
    }
}

export default new ProjectsCache();