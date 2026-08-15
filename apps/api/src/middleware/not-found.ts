import type { RequestHandler } from "express";

import { ApiError } from "../utils/api-error.js";

export const notFoundMiddleware: RequestHandler = (
  request,
  _response,
  next,
) => {
  next(
    new ApiError(
      404,
      "ROUTE_NOT_FOUND",
      `The route ${request.method} ${request.originalUrl} does not exist.`,
    ),
  );
};
