import type {
  EmailProvider,
  EmailMessage,
  BulkEmailRequest,
  BulkEmailResult,
  EmailResult,
} from "../types";

export abstract class BaseEmailProvider implements EmailProvider {
  abstract sendEmail(message: EmailMessage): Promise<EmailResult>;
  abstract getProviderName(): string;

  async sendBulk(request: BulkEmailRequest): Promise<BulkEmailResult> {
    const { messages, batchSize = 10 } = request;
    const results: EmailResult[] = [];
    let successCount = 0;
    let failedCount = 0;

    // Process in batches
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      const batchPromises = batch.map((message) => this.sendEmail(message));

      const batchResults = await Promise.allSettled(batchPromises);

      for (const result of batchResults) {
        if (result.status === "fulfilled" && result.value.success) {
          successCount++;
          results.push(result.value);
        } else {
          failedCount++;
          results.push({
            success: false,
            error:
              result.status === "rejected"
                ? result.reason.message
                : result.value.error,
          });
        }
      }
    }

    return { successCount, failedCount, results };
  }
}
