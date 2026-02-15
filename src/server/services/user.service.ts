import { db } from "../db";
import { usersTable } from "../db/schema/users.schema";
import { User } from "../interfaces/user.interface";
import { userValidation } from "../validation/user.validation";
import { sql } from "drizzle-orm";
import { z } from "zod";

export const userService = {
   createUser: async (
      data: z.infer<typeof userValidation.createUserRequest>["body"],
   ): Promise<void> => {
      await db.insert(usersTable).values(data);
   },
   getUsers: async (): Promise<User[]> => {
      return await db.select().from(usersTable);
   },
   getUserById: async (userId: number): Promise<User | null> => {
      const rows = await db
         .select()
         .from(usersTable)
         .where(sql`${usersTable.id} = ${userId}`)
         .limit(1);
      return rows[0] ?? null;
   },
};
