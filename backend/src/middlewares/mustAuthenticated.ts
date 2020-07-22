import { Request, Response } from "express";
import AuthentificationProvider from 'src/providers/AuthenticationProvider';
import ResponseProvider from 'src/providers/ResponseProvider';
const responseProvider: ResponseProvider = new ResponseProvider();
const authenticationProvider: AuthentificationProvider = new AuthentificationProvider();

export default async function mustAuthenticated(req: Request, res: Response, next: any) {
    const token =  req.signedCookies.token;
    if (!token) {
      return responseProvider.createUnauthorizedRequestResponse(res);
    }
    const result = authenticationProvider.verifyAuthCookies(req);
    if (result) {
        return next();
    }
    return responseProvider.createUnauthorizedRequestResponse(res);
  }