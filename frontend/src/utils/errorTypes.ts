import { BaseError } from 'make-error';

export class ApiError extends BaseError {
  public status: number;
  public message: string;

  constructor(cause = {}, filename: string) {
    // @ts-ignore
    const { config = {}, response = {} } = cause;
    const { url = 'unknown url', method } = config;
    const { status, data } = response;
    const extendedMessage = `${method} ${url} results with ${status}`;

    // @ts-ignore
    super(extendedMessage, filename);
    this.status = status;
    this.message = data.error || data.message;
    // @NOTE: workaround to preserve class name after bundling
    this.name = 'ApiError';
  }
}
