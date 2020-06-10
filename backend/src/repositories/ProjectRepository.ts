import ProjectConfiguration from '@entities/ProjectConfiguration';
import fs from 'fs';
import path from 'path';
import ProjectsConfigurationFile from '@entities/ProjectsConfigurationFile';

export default class ProjectRepository {
    public getProjectsConfiguration(): ProjectConfiguration[] {
        let projectsConfigurationFile: ProjectsConfigurationFile = this.getProjectConfigurationFile();
        if (!projectsConfigurationFile) {
            throw new Error("Configuration file is invalid")
        }
        return projectsConfigurationFile.projects || [];
    }

    private getProjectConfigurationFile() {
        var projectsFilePath: string = path.join(__dirname, "../", "projects.json");
        let projectsData: string = fs.readFileSync(projectsFilePath, "utf8");
        let projectsConfigurationFile: ProjectsConfigurationFile = JSON.parse(projectsData) as ProjectsConfigurationFile;
        return projectsConfigurationFile;
    }
}