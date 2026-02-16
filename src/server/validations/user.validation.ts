import { usersTable } from "../db/schema/users.schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { requestValidation } from "./request.validation";

export const userValidation = {
   createUserRequest: requestValidation.baseRequest.extend({
      body: createInsertSchema(usersTable, { id: z.coerce.number() }),
   }),
   getUserByIdRequest: requestValidation.baseRequest.extend({
      params: z.object({ userId: z.coerce.number() }),
   }),
};
