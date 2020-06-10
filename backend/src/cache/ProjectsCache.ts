import ProjectRepository from 'src/repositories/ProjectRepository';
    import cache from 'memory-cache';
import ProjectConfiguration from '@entities/ProjectConfiguration';

class ProjectsCache
{
    private readonly projectsConfiguration: string = "projectsConfiguration";
    private projectRepository: ProjectRepository = new ProjectRepository();

    public init() {
        cache.put(this.projectsConfiguration, this.projectRepository.getProjectsConfiguration());
    }

    public getProjectsConfiguration() {
        return cache.get(this.projectsConfiguration) as ProjectConfiguration[];
    }
}

export default new ProjectsCache();