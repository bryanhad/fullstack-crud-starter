import { env } from "../utils/env.util";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dbPool = new Pool({
   connectionString: env.DB_URL!,
});

const db = drizzle({ client: dbPool });

export { db, dbPool };
