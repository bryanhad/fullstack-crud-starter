import { z } from "zod";

const envSchema = z.object({
   NODE_ENV: z.string().optional(),
   PORT: z.coerce.number(),
   DB_FILE_NAME: z.string().transform((fileName) => `data/${fileName}`),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
   console.error("❌ Invalid environment variables:", parsedEnv.error);
   process.exit(1);
}

export const env = parsedEnv.data;
