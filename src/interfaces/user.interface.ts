import { usersTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof usersTable>;
