import ProjectConfiguration from "@entities/project/ProjectConfiguration";
import projectsCache from "src/cache/AppSettingsCache";
import ProjectProvider from "src/providers/ProjectProvider";

describe("ProjectProvider", () => {
  const projectId: string = "testName";
  const bucketName: string = "test";
  const sourceFileName: string = "translation.json";
  const projectConfiguration: ProjectConfiguration = new ProjectConfiguration(
    projectId,
    bucketName,
    "accessKeyId",
    "secretAccessKey",
    "",
    sourceFileName
  );
  const projectsConfiguration: ProjectConfiguration[] = [projectConfiguration];
  let projectProvider: ProjectProvider;

  beforeAll((done) => {
    spyOn(projectsCache, "getProjectsConfiguration").and.returnValue(
      projectsConfiguration
    );
    projectProvider = new ProjectProvider();
    done();
  });

  describe("getAllProjects", () => {
    it(`should all projects configuration`, (done) => {
      const result: ProjectConfiguration[] = projectProvider.getAllProjects();

      expect(result).toEqual(projectsConfiguration);
      done();
    });
  });

  describe("getProject", () => {
    it(`should return project configuration when projectId exists`, (done) => {
      const result: ProjectConfiguration | null = projectProvider.getProject(
        projectId
      );

      expect(result).toEqual(projectConfiguration);
      done();
    });

    it(`should return null when projectId does not exist`, (done) => {
      expect(() => projectProvider.getProject("test")).toThrowError(
        "Project (test) does not exist!"
      );
      done();
    });
  });

  describe("getSourceFileName", () => {
    it(`should return project configuration when projectId exists`, (done) => {
      const result: string = projectProvider.getSourceFileName(projectId);

      expect(result).toEqual(sourceFileName);
      done();
    });
  });

  describe("getBucketName", () => {
    it(`should return project configuration when projectId exists`, (done) => {
      const result: string = projectProvider.getBucketName(projectId);

      expect(result).toEqual(bucketName);
      done();
    });
  });
});
