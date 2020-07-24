import AppSettings from "@entities/AppSettings";
import { AuthenticationSettings } from "@entities/authentication/AuthenticationSettings";
import ProjectConfiguration from "@entities/project/ProjectConfiguration";
import AppSettingsCache from "src/cache/AppSettingsCache";
import AppSettingsRepository from "src/repositories/ProjectRepository";
import { AuthenticationConfiguration } from "./../../src/entities/authentication/AuthenticationConfiguration";

describe("ProjectsCache", () => {
  const projectConfigurations = [
    new ProjectConfiguration("test", "test", "", "", "", ""),
  ];

  const auth = new AuthenticationConfiguration(
    {} as AuthenticationSettings,
    "test",
    1
  );

  const appSettings = new AppSettings(projectConfigurations, auth, []);

  it(`should init cache with projects`, (done) => {
    spyOn(AppSettingsRepository.prototype, "getAppSettings").and.returnValue(
      appSettings
    );

    AppSettingsCache.init();

    const result = AppSettingsCache.getProjectsConfiguration();
    expect(result).toEqual(appSettings.projects);
    done();
  });

  it(`should init cache with authentication settings`, (done) => {
    spyOn(AppSettingsRepository.prototype, "getAppSettings").and.returnValue(
      appSettings
    );

    AppSettingsCache.init();

    const result = AppSettingsCache.getAuthenticationConfiguration();
    expect(result).toEqual(appSettings.authentication);
    done();
  });

  it(`should init cache with users settings`, (done) => {
    spyOn(AppSettingsRepository.prototype, "getAppSettings").and.returnValue(
      appSettings
    );

    AppSettingsCache.init();

    const result = AppSettingsCache.getUsers();
    expect(result).toEqual(appSettings.users);
    done();
  });
});
