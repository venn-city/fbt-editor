import { AuthenticationConfiguration } from "./authentication/AuthenticationConfiguration";
import ProjectConfiguration from "./project/ProjectConfiguration";

export default class AppSettings {
  constructor(
    public projects: ProjectConfiguration[],
    public authentication: AuthenticationConfiguration,
    public users: string[]
  ) {}
}
