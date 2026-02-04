import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { User } from "@/interfaces/user.interface";
import { createUserRequestSchema } from "@/validation/user.validation";
import { sql } from "drizzle-orm";
import { z } from "zod";

export async function createUser(
   data: z.infer<typeof createUserRequestSchema>["body"],
): Promise<void> {
   await db.insert(usersTable).values(data);
}

export async function getUsers(): Promise<User[]> {
   return await db.select().from(usersTable);
}

export async function getUserById(userId: number): Promise<User | null> {
   const rows = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.id} = ${userId}`)
      .limit(1);
   return rows[0] ?? null;
}
