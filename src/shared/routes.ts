import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";
import { emailService } from "./email/service";
import type { SendEmailRoute, SendBulkEmailRoute } from "@/routes/email";
import env from "@/env";

export const sendEmail: AppRouteHandler<SendEmailRoute> = async (c) => {
  const data = c.req.valid("json");

  const result = await emailService.sendEmail({
    to: data.to,
    from: data.from || env.DEFAULT_FROM_EMAIL,
    subject: data.subject,
    html: data.html,
    text: data.text,
  });

  if (!result.success) {
    return c.json({ message: result.error }, HttpStatusCodes.BAD_REQUEST);
  }

  return c.json(
    {
      message: "Email sent successfully",
      messageId: result.messageId,
    },
    HttpStatusCodes.OK
  );
};

export const sendBulkEmail: AppRouteHandler<SendBulkEmailRoute> = async (c) => {
  const data = c.req.valid("json");

  const result = await emailService.sendBulk({
    messages: data.messages,
    batchSize: data.batchSize,
  });

  return c.json(
    {
      message: `Bulk email completed: ${result.successCount} sent, ${result.failedCount} failed`,
      results: result.results,
    },
    HttpStatusCodes.OK
  );
};
