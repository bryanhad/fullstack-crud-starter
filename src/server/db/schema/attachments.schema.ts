import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestampColumns } from "./helper.schema";
import { transactionsTable } from "./transactions.schema";

export const attachmentsTable = pgTable("attachments", {
   id: text().primaryKey(),
   transactionId: integer("transaction_id")
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
