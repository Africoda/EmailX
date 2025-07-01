import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const emails = pgTable("emails", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: text("subject").notNull().unique(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const selectUsersSchema = createSelectSchema(emails);
export const insertUsersSchema = createInsertSchema(emails).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
