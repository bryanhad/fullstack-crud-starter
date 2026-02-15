import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "../db/schema/users.schema";

export type User = InferSelectModel<typeof usersTable>;
