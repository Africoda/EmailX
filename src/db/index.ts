import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import env from "@/env";

import * as schema from "./schema/schema";
import * as emailTemplate from "./schema/email_template";

const client = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
});

const db = drizzle(client, {
  schema: {
    ...schema,
    ...emailTemplate,
  },
});

export default db;
