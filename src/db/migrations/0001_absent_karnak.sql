ALTER TABLE "emails" RENAME TO "email_templates";--> statement-breakpoint
ALTER TABLE "email_templates" DROP CONSTRAINT "emails_subject_unique";--> statement-breakpoint
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_subject_unique" UNIQUE("subject");