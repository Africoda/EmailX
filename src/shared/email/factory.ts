import type { EmailProvider } from "./types";
import { ResendProvider } from "./providers/resend";
import env from "@/env";

export function createEmailProvider(
  providerName: string,
  apiKey: string
): EmailProvider {
  switch (providerName.toLowerCase()) {
    case "resend":
      return new ResendProvider(apiKey);
    default:
      throw new Error(`Unsupported email provider: ${providerName}`);
  }
}
