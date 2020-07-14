import { Request, Response } from "express";
import AuthentificationProvider from 'src/providers/AuthentificationProvider';
import ResponseProvider from 'src/providers/ResponseProvider';
const responseProvider: ResponseProvider = new ResponseProvider();
const authentificationProvider: AuthentificationProvider = new AuthentificationProvider();

export default async function mustAuthenticated(req: Request, res: Response, next: any) {
    const token =  req.signedCookies.token;
    if (!token) {
      return responseProvider.createUnauthorizedRequestResponse(res);
    }
    const result = authentificationProvider.verifyAuthCookies(req);
    if (result) {
        return next();
    }
    return responseProvider.createUnauthorizedRequestResponse(res);
  }