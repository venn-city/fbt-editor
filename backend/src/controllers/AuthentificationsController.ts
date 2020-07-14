import { AuthentificationClientData } from '@entities/AuthentificationClientData';
import AuthentificationResult from '@entities/AuthentificationResult';
import { AuthentificationSettings } from '@entities/AuthentificationSettings';
import { LoginUserRequest } from '@entities/LoginUserRequest';
import { Request, Response } from "express";
import AuthentificationProvider from 'src/providers/AuthentificationProvider';
import ResponseProvider from 'src/providers/ResponseProvider';
import AuthentificationService from 'src/services/AuthentificationService';

class AuthentificationsController {
    private readonly responseProvider: ResponseProvider = new ResponseProvider();
    private readonly authentificationProvider: AuthentificationProvider = new AuthentificationProvider();
    private readonly authentificationService: AuthentificationService = new AuthentificationService();
    private readonly authentificationSettings: AuthentificationSettings;

    constructor() {
        this.login = this.login.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.authentificationSettings = this.authentificationProvider.getAuthentificationSettings();
    }

    public async getClientData(req: Request, res: Response)  {
        return this.responseProvider.createSuccessfullResponse(res, new AuthentificationClientData(this.authentificationSettings.clientId));
    }

    public async login(req: Request, res: Response)  {
        const loginUserRequest = req.body as LoginUserRequest;
        if (loginUserRequest) {
            const authentificationResult: AuthentificationResult = await this.authentificationService.login(loginUserRequest.tokenId);
            if (authentificationResult.currentUser) {
                this.authentificationProvider.setAuthCookies(res, authentificationResult.currentUser.tokenId);
                return this.responseProvider.createSuccessfullResponse(res, authentificationResult.currentUser);
            }
            return this.responseProvider.createRequestResponse(res, authentificationResult.statusCode, authentificationResult.message);
        }
        return this.responseProvider.createBadRequestResponse(res, "Bad request");
    }
}

export default new AuthentificationsController();
