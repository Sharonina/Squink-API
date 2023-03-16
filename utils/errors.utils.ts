class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message); //traemos lo que tiene Error para unirlo con status code
    this.statusCode = statusCode;
  }
}

export function errorObject(statusCode: number, message: string) {
  new Error(message);
  const error = new ApiError(statusCode, message);
  return error;
}
