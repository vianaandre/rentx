class AppError {
  readonly message: string;
  readonly status: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.status = statusCode;
  }
}

export { AppError };
