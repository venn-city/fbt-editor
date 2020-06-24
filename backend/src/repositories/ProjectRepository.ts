import ProjectConfiguration from '@entities/ProjectConfiguration';
import ProjectsConfigurationFile from '@entities/ProjectsConfigurationFile';
import fs from 'fs';
import path from 'path';

export default class ProjectRepository {
    public getProjectsConfiguration(): ProjectConfiguration[] {
        const projectsConfigurationFile: ProjectsConfigurationFile = this.getProjectConfigurationFile();
        if (!projectsConfigurationFile) {
            throw new Error("Configuration file is invalid");
        }
        return projectsConfigurationFile.projects || [];
    }

    private getProjectConfigurationFile() {
        const projectsFilePath: string = path.join(__dirname, "../", "projects.json");
        const projectsData: string = fs.readFileSync(projectsFilePath, "utf8");
        const projectsConfigurationFile: ProjectsConfigurationFile = JSON.parse(projectsData) as ProjectsConfigurationFile;
        return projectsConfigurationFile;
    }
}