import { Response } from "express";
import { OK, BAD_REQUEST } from 'http-status-codes';

export default class ResponseProvider {

    public createBadRequestResponse(res: Response, message: string) {
        return res.status(BAD_REQUEST).json({
            statusCode: BAD_REQUEST, 
            message: message
        });
    }

    public createSuccessfullResponse(res: Response, result: any) {
        return res.status(OK).json(result);
    }
}