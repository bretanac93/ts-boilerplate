export abstract class HttpClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor(message: object | string) {
    message instanceof Object ? super(JSON.stringify(message)) : super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpBadRequestError extends HttpClientError {
  readonly statusCode = 400;
  constructor(message: string | object = "Bad Request") {
    super(message);
  }
}

export class HttpNotFoundError extends HttpClientError {
  readonly statusCode = 404;
  constructor(message: string | object = "Not found") {
    super(message);
  }
}
