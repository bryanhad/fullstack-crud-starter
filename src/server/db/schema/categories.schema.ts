import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { timestampColumns } from "./helper.schema";
import { transactionsTable } from "./transactions.schema";
import { usersTable } from "./users.schema";

export const categoriesTable = pgTable(
   "categories",
   {
      id: integer().primaryKey(),
      userId: integer("user_id")
         .notNull()
         .references(() => usersTable.id),
      name: text("name").notNull(),
      ...timestampColumns,
   },
   // add unique index ( category "name" has to be unique for each "user_id" )
   (table) => [
      uniqueIndex("categories_user_id_name_unique").on(table.userId, table.name),
   ],
);

export const categoriesRelations = relations(categoriesTable, ({ one, many }) => ({
   user: one(usersTable, {
      fields: [categoriesTable.userId],
      references: [usersTable.id],
   }),
   transactions: many(transactionsTable),
}));
