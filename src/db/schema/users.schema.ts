import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestampColumns } from "./helper.schema";
import { relations } from "drizzle-orm";
import { transactionsTable } from "./transactions.schema";

export const usersTable = sqliteTable("users", {
   id: int().primaryKey({ autoIncrement: true }),
   name: text().notNull(),
   ...timestampColumns,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
   transactions: many(transactionsTable),
}));
