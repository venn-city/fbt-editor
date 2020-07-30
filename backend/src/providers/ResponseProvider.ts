import { Response } from "express";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "http-status-codes";

export default class ResponseProvider {
  public createBadRequestResponse(res: Response, message: string) {
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      message,
    });
  }

  public createRequestResponse(
    res: Response,
    statusCode: number,
    message: string
  ) {
    return res.status(BAD_REQUEST).json({
      statusCode,
      message,
    });
  }
  public createUnauthorizedRequestResponse(res: Response) {
    return res
      .status(UNAUTHORIZED)
      .send({ statusCode: UNAUTHORIZED, message: "UNAUTHORIZED" });
  }

  public createSuccessfullResponse<TData>(res: Response, result: TData) {
    return res.status(OK).json(result);
  }
}
