import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";
import { ApiError } from "../utils/api-error.js";
import { createErrorResponse } from "../utils/api-response.js";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json(
      createErrorResponse(
        "VALIDATION_ERROR",
        "The request contains invalid fields.",
        {
          issues: error.issues,
          requestId: request.requestId,
        },
      ),
    );

    return;
  }

  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      logger.error(
        {
          error,
          requestId: request.requestId,
          method: request.method,
          path: request.originalUrl,
        },
        error.message,
      );
    }

    response.status(error.statusCode).json(
      createErrorResponse(error.code, error.message, {
        ...error.details,
        requestId: request.requestId,
      }),
    );

    return;
  }

  logger.error(
    {
      error,
      requestId: request.requestId,
      method: request.method,
      path: request.originalUrl,
    },
    "An unhandled API error occurred.",
  );

  const details =
    env.NODE_ENV === "development" && error instanceof Error
      ? {
          requestId: request.requestId,
          stack: error.stack,
        }
      : {
          requestId: request.requestId,
        };

  response
    .status(500)
    .json(
      createErrorResponse(
        "INTERNAL_SERVER_ERROR",
        "An unexpected error occurred.",
        details,
      ),
    );
};
