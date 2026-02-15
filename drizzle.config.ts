import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

const serverDirPath = fs.existsSync("src/server") ? "src/server" : "dist";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { env }: { env: Record<string, unknown> } = require(
   path.resolve(serverDirPath, "utils/env.util"),
);

export default defineConfig({
   out: "./drizzle",
   schema: path.resolve(process.cwd(), serverDirPath, "db/schema"),
   dialect: "postgresql",
   dbCredentials: { url: env["DB_URL"] as string },
});
