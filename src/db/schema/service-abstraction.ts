import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const serviceAbstraction = pgTable("service_abstraction", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// Zod Schemas for type validation
export const insertServiceAbstractionSchema =
  createInsertSchema(serviceAbstraction);
export const selectServiceAbstractionSchema =
  createSelectSchema(serviceAbstraction);

export type ServiceAbstraction = typeof serviceAbstraction.$inferSelect;
export type NewServiceAbstraction = typeof serviceAbstraction.$inferInsert;
export const serviceAbstractionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const newServiceAbstractionSchema = z.object({
  name: z.string().max(255),
  description: z.string(),
});
