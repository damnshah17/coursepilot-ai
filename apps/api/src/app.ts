import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { requestIdMiddleware } from "./middleware/request-id.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.disable("x-powered-by");

app.use(requestIdMiddleware);

app.use(
  pinoHttp({
    logger,

    genReqId: (request) => {
      const existingRequestId = request.headers["x-request-id"];

      if (typeof existingRequestId === "string") {
        return existingRequestId;
      }

      return request.id;
    },

    customProps: (request) => ({
      requestId: request.id,
    }),

    customSuccessMessage: (request, response) =>
      `${request.method ?? "UNKNOWN"} ${
        request.url ?? "UNKNOWN"
      } completed with ${response.statusCode}`,

    customErrorMessage: (request, response, _error) =>
      `${request.method ?? "UNKNOWN"} ${
        request.url ?? "UNKNOWN"
      } failed with ${response.statusCode}`,
  }),
);

app.use(helmet());

app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    exposedHeaders: ["X-Request-ID"],
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  }),
);

app.use(env.API_PREFIX, apiRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
