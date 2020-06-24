import { Response } from "express";
import { BAD_REQUEST, OK } from 'http-status-codes';

export default class ResponseProvider {

    public createBadRequestResponse(res: Response, message: string) {
        return res.status(BAD_REQUEST).json({
            statusCode: BAD_REQUEST,
            message
        });
    }

    public createSuccessfullResponse<TData>(res: Response, result: TData) {
        return res.status(OK).json(result);
    }
}