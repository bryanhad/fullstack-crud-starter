import { usersTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { baseRequestSchema } from "./request.validation";

export const createUserRequestSchema = baseRequestSchema.extend({
   body: createInsertSchema(usersTable),
});

export const getUserByIdRequestSchema = baseRequestSchema.extend({
   params: z.object({ userId: z.coerce.number() }),
});
