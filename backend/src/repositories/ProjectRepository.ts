import AppSettings from "@entities/AppSettings";
import fs from "fs";
import path from "path";

export default class AppSettingsRepository {
  public getAppSettings(): AppSettings {
    const appSettingsFile: AppSettings = this.getAppSettingsFile();
    if (!appSettingsFile) {
      throw new Error("Application settings file is invalid");
    }
    return appSettingsFile;
  }

  private getAppSettingsFile(): AppSettings {
    const projectsFilePath: string = path.join(
      __dirname,
      "../",
      "appSettings.json"
    );
    const appSettingsData: string = fs.readFileSync(projectsFilePath, "utf8");
    return JSON.parse(appSettingsData) as AppSettings;
  }
}
