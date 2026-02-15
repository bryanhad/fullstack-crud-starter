import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestampColumns } from "./helper.schema";
import { relations } from "drizzle-orm";
import { transactionsTable } from "./transactions.schema";

export const usersTable = pgTable("users", {
   id: integer().primaryKey(),
   name: text().notNull(),
   ...timestampColumns,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
   transactions: many(transactionsTable),
}));
