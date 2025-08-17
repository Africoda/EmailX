import { createRoute, z } from "@hono/zod-openapi";
import { jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

const EmailMessageSchema = z.object({
  to: z.string().email(),
  from: z.string().email(),
  subject: z.string().min(1),
  html: z.string().optional(),
  text: z.string().optional(),
});

const BulkEmailSchema = z.object({
  messages: z.array(EmailMessageSchema),
  batchSize: z.number().optional().default(10),
});

export const SendEmailRoute = createRoute({
  method: "post",
  path: "/email/send",
  tags: ["Email"],
  request: {
    body: jsonContentRequired(EmailMessageSchema, "Email message data"),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            messageId: z.string().optional(),
          }),
        },
      },
      description: "Email sent successfully",
    },
  },
});

export const SendBulkEmailRoute = createRoute({
  method: "post",
  path: "/email/send-bulk",
  tags: ["Email"],
  request: {
    body: jsonContentRequired(BulkEmailSchema, "Bulk email data"),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            processed: z.number(),
            failed: z.number(),
          }),
        },
      },
      description: "Bulk emails processed",
    },
  },
});

export type EmailRoute = typeof SendEmailRoute | typeof SendBulkEmailRoute;
