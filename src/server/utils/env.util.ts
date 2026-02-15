import { z } from "zod";

const envSchema = z
   .object({
      NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
      APP_PORT: z.coerce.number(),

      POSTGRES_HOST: z.string(),
      POSTGRES_PORT: z.coerce.number(),
      POSTGRES_DB_NAME: z.string(),
      POSTGRES_USER: z.string(),
      POSTGRES_PASSWORD: z.string(),
      VITE_DEV_SERVER: z.url().optional(),
   })
   .refine(
      (data) => data.NODE_ENV === "production" || data.VITE_DEV_SERVER !== undefined,
      {
         message: "VITE_DEV_SERVER is required in development",
         path: ["VITE_DEV_SERVER"],
      },
   );

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
   console.error("❌ Invalid environment variables:", parsedEnv.error);
   process.exit(1);
}

const { data } = parsedEnv;

export const env = {
   ...data,
   DB_URL: `postgres://${encodeURIComponent(data.POSTGRES_USER)}:${encodeURIComponent(data.POSTGRES_PASSWORD)}@${data.POSTGRES_HOST}:${data.POSTGRES_PORT}/${data.POSTGRES_DB_NAME}`,
};
