import { AuthenticationClientData } from "@entities/authentication/AuthenticationClientData";
import AuthenticationResult from "@entities/authentication/AuthenticationResult";
import { AuthenticationSettings } from "@entities/authentication/AuthenticationSettings";
import { LoginUserRequest } from "@entities/LoginUserRequest";
import { Request, Response } from "express";
import AuthenticationProvider from "src/providers/AuthenticationProvider";
import ResponseProvider from "src/providers/ResponseProvider";
import AuthenticationService from "src/services/AuthenticationService";

class AuthenticationController {
  private readonly responseProvider: ResponseProvider = new ResponseProvider();
  private readonly authenticationProvider: AuthenticationProvider = new AuthenticationProvider();
  private readonly authenticationService: AuthenticationService = new AuthenticationService();
  private readonly authenticationSettings: AuthenticationSettings;

  constructor() {
    this.login = this.login.bind(this);
    this.getClientData = this.getClientData.bind(this);
    this.authenticationSettings = this.authenticationProvider.getAuthenticationSettings();
  }

  public async getClientData(req: Request, res: Response) {
    return this.responseProvider.createSuccessfullResponse(
      res,
      new AuthenticationClientData(this.authenticationSettings.clientId)
    );
  }

  public async login(req: Request, res: Response) {
    const loginUserRequest = req.body as LoginUserRequest;
    if (loginUserRequest) {
      const authenticationResult: AuthenticationResult = await this.authenticationService.login(
        loginUserRequest.tokenId
      );
      if (authenticationResult.currentUser) {
        this.authenticationProvider.setAuthCookies(
          res,
          authenticationResult.currentUser.tokenId
        );
        return this.responseProvider.createSuccessfullResponse(
          res,
          authenticationResult.currentUser
        );
      }
      return this.responseProvider.createRequestResponse(
        res,
        authenticationResult.statusCode,
        authenticationResult.message
      );
    }
    return this.responseProvider.createBadRequestResponse(res, "Bad request");
  }
}

export default new AuthenticationController();
