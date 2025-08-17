export interface EmailMessage {
  to: string | string[];
  from: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface BulkEmailRequest {
  messages: EmailMessage[];
  batchSize?: number;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface BulkEmailResult {
  successCount: number;
  failedCount: number;
  results: EmailResult[];
}

export interface EmailProvider {
  sendEmail(message: EmailMessage): Promise<EmailResult>;
  sendBulk(request: BulkEmailRequest): Promise<BulkEmailResult>;
  getProviderName(): string;
}
