import { Project } from "@entities/project/Project";
import ProjectConfiguration from "@entities/project/ProjectConfiguration";
import { Request, Response } from "express";
import _ from "lodash";
import ProjectProvider from "src/providers/ProjectProvider";
import ResponseProvider from "src/providers/ResponseProvider";

class ProjectController {
  private readonly projectProvider: ProjectProvider = new ProjectProvider();
  private readonly responseProvider: ResponseProvider = new ResponseProvider();

  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    const projectsConfiguration: ProjectConfiguration[] = this.projectProvider.getAllProjects();
    const projects: Project[] = _.map(
      projectsConfiguration,
      (projectConfiguration: ProjectConfiguration) =>
        new Project(
          projectConfiguration.projectName,
          projectConfiguration.projectName,
          `https://${projectConfiguration.bucketName}.s3.amazonaws.com/`
        )
    );
    return this.responseProvider.createSuccessfullResponse(res, projects);
  }
}

export default new ProjectController();
