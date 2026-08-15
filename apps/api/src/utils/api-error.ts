import type { ApiErrorDetails } from "./api-response.js";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: ApiErrorDetails;
  public readonly isOperational: boolean;

  public constructor(
    statusCode: number,
    code: string,
    message: string,
    details: ApiErrorDetails = {},
    isOperational = true,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, ApiError);
  }
}
