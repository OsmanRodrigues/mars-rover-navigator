export class CustomError extends Error {
  constructor(statusCode: number, error: string, message: string) {
    super(message);
  }
}
