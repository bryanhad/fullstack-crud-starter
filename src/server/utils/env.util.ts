import { z } from "zod";

const envSchema = z.object({
   NODE_ENV: z.string().optional(),
   APP_PORT: z.coerce.number(),

   POSTGRES_HOST: z.string(),
   POSTGRES_PORT: z.coerce.number(),
   POSTGRES_DB_NAME: z.string(),
   POSTGRES_USER: z.string(),
   POSTGRES_PASSWORD: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
   console.error("❌ Invalid environment variables:", parsedEnv.error);
   process.exit(1);
}

const { data } = parsedEnv;

export const env = {
   ...data,
   DB_URL: `postgres://${data.POSTGRES_USER}:${data.POSTGRES_PASSWORD}@${data.POSTGRES_HOST}:${data.POSTGRES_PORT}/${data.POSTGRES_DB_NAME}`,
};
