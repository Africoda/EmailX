import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const emailTemplate = pgTable("email_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull().unique(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const selectUsersSchema = createSelectSchema(emailTemplate);
export const insertUsersSchema = createInsertSchema(emailTemplate).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Template = typeof emailTemplate.$inferSelect;
export type NewTemplate = typeof emailTemplate.$inferInsert;
