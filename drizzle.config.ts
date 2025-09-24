import "dotenv/config";
import { env } from "./src/utils/env.util";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
   out: "./drizzle",
   schema: "./src/db/schema/index.ts",
   dialect: "sqlite",
   dbCredentials: {
      url: env.DB_FILE_NAME,
   },
});
