import { AuthenticationSettings } from "./AuthenticationSettings";

export class AuthenticationConfiguration {
  public constructor(
    public google: AuthenticationSettings,
    public cookiesSecret: string,
    public cookiesMaxAge: number
  ) {}
}
