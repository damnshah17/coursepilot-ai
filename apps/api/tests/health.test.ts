import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../src/app.js";

describe("health routes", () => {
  it("returns the API liveness status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers["x-request-id"]).toBeDefined();

    expect(response.body).toMatchObject({
      success: true,
      data: {
        status: "ok",
        service: "coursepilot-api",
      },
      meta: {},
    });
  });

  it("returns the standard not-found response", async () => {
    const response = await request(app).get("/api/unknown-route");

    expect(response.status).toBe(404);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: "ROUTE_NOT_FOUND",
        message: "The route GET /api/unknown-route does not exist.",
        details: {
          requestId: expect.any(String),
        },
      },
    });
  });
});
