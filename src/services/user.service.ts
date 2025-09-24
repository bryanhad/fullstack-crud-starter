import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@/interfaces/user.interface";
import { createUserRequestSchema } from "@/validation/user.validation";
import { sql } from "drizzle-orm";
import { z } from "zod";

export class UserService {
   public static async createUser(
      data: z.infer<typeof createUserRequestSchema>["body"],
   ): Promise<void> {
      await db.insert(usersTable).values(data);
   }

   public static async getUsers(): Promise<User[]> {
      return await db.select().from(usersTable);
   }

   public static async getUserById(userId: number): Promise<User | null> {
      const rows = await db
         .select()
         .from(usersTable)
         .where(sql`${usersTable.id} = ${userId}`)
         .limit(1);
      return rows[0] ?? null;
   }
}
