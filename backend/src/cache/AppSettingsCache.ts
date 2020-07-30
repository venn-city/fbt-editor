import AppSettings from "@entities/AppSettings";
import { AuthenticationConfiguration } from "@entities/authentication/AuthenticationConfiguration";
import ProjectConfiguration from "@entities/project/ProjectConfiguration";
import cache from "memory-cache";
import AppSettingsRepository from "src/repositories/ProjectRepository";

class AppSettingsCache {
  private readonly appSettings: string = "appSettings";
  private readonly appSettingsRepository: AppSettingsRepository = new AppSettingsRepository();

  constructor() {
    this.init();
  }

  public init() {
    cache.put(this.appSettings, this.appSettingsRepository.getAppSettings());
  }

  public getProjectsConfiguration(): ProjectConfiguration[] {
    return this.getAppSettings().projects;
  }

  public getAuthenticationConfiguration(): AuthenticationConfiguration {
    return this.getAppSettings().authentication;
  }

  public getUsers(): string[] {
    return this.getAppSettings().users;
  }

  private getAppSettings(): AppSettings {
    return cache.get(this.appSettings) as AppSettings;
  }
}

export default new AppSettingsCache();
