import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

const requestIdHeader = "x-request-id";

export function requestIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const incomingRequestId = request.header(requestIdHeader)?.trim();

  request.requestId =
    incomingRequestId && incomingRequestId.length <= 128
      ? incomingRequestId
      : randomUUID();

  response.setHeader(requestIdHeader, request.requestId);

  next();
}
