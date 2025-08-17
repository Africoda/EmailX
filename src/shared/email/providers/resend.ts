import { Resend } from "resend";
import { BaseEmailProvider } from "./base";
import type { EmailMessage, EmailResult } from "../types";
import env from "@/env";

export class ResendProvider extends BaseEmailProvider {
  private resend: Resend;

  constructor(RESEND_API_KEY: string) {
    super();
    this.resend = new Resend(RESEND_API_KEY);
  }

  async sendEmail(message: EmailMessage): Promise<EmailResult> {
    try {
      const { data, error } = await this.resend.emails.send({
        to: Array.isArray(message.to) ? message.to : [message.to],
        from: message.from,
        subject: message.subject,
        html: message.html,
        text: message.text || "",
        attachments: message.attachments,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        messageId: data?.id,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }
  }

  getProviderName(): string {
    return "Resend";
  }
}
