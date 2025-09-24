import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TransactionType } from "@/interfaces/transaction.interface";
import { timestampColumns } from "./helper.schema";
import { relations } from "drizzle-orm";
import { usersTable } from "./users.schema";
import { attachmentsTable } from "./attachments.schema";
import { categoriesTable } from "./categories.schema";

export const transactionsTable = sqliteTable("transactions", {
   id: int().primaryKey({ autoIncrement: true }),
   userId: int("user_id")
      .notNull()
      .references(() => usersTable.id),
   categoryId: int("category_id").references(() => categoriesTable.id),
   type: text("type", {
      enum: [TransactionType.Income, TransactionType.Expense], // add db constraint
   }).notNull(),
   amount: integer({ mode: "number" }).notNull(),
   description: text("description"),
   ...timestampColumns,
});

export const transactionsRelations = relations(transactionsTable, ({ one, many }) => ({
   user: one(usersTable, {
      fields: [transactionsTable.userId],
      references: [usersTable.id],
   }),
   category: one(categoriesTable, {
      fields: [transactionsTable.categoryId],
      references: [categoriesTable.id],
   }),
   attachments: many(attachmentsTable),
}));
