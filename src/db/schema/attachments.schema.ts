import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestampColumns } from "./helper.schema";
import { transactionsTable } from "./transactions.schema";

export const attachmentsTable = sqliteTable("attachments", {
   id: text().primaryKey(),
   transactionId: int("transaction_id")
      .notNull()
      .references(() => transactionsTable.id),
   url: text().notNull(), // could be local file path or S3 URL
   ...timestampColumns,
});

export const attachmentsRelations = relations(attachmentsTable, ({ one }) => ({
   transaction: one(transactionsTable, {
      fields: [attachmentsTable.transactionId],
      references: [transactionsTable.id],
   }),
}));
