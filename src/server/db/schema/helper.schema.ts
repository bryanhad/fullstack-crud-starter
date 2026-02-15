import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
   createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`), // only on insert
   updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`) // only on insert
      .$onUpdate(() => sql`now()`), // refreshed on update
};
