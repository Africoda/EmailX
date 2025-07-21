import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { internalServerErrorSchema } from "@/lib/constants";

export const createTemplate = createRoute({
  path: "/email-templates",
  tags: ["Email Templates"],
  method: "post",
  request: {
    body: jsonContentRequired(
      z.object({
        name: z.string(),
        subject: z.string(),
        body: z.string(),
        variables: z.record(z.string(), z.any()).optional(),
      }),
      "Email template data"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({
        id: z.string(),
        subject: z.string(),
        body: z.string(),
        variables: z.record(z.string(), z.any()).optional(),
      }),
      "Created email template"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      internalServerErrorSchema,
      "Internal Server Error"
    ),
  },
});

export type CreateTemplateRoute = typeof createTemplate;
