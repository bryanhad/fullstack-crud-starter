import { Server } from "http";
import { env } from "./env.util";
import { db, dbPool } from "../db";
import { sql } from "drizzle-orm";

let isShuttingDown = false;
export function shutdown(server: Server, signal: string) {
   if (isShuttingDown) return;
   isShuttingDown = true;

   console.log(`${signal} received. Shutting down gracefully...`);

   server.close(async () => {
      console.log("HTTP server closed.");

      await dbPool.end();
      console.log("Database pool closed.");

      process.exit(0);
   });

   setTimeout(async () => {
      console.error("Graceful shutdown timed out. Forcing exit.");

      await dbPool.end();
      process.exit(1);
   }, 10000); // 10 seconds
}

export function handleServerError(err: NodeJS.ErrnoException) {
   if (err.code === "EADDRINUSE") {
      throw new Error(`Port ${env.APP_PORT} is already in use.`);
   }
   throw err;
}

export async function checkDBConnection() {
   await db.execute(sql`select 1;`);
   console.log("Database Pool is ready");
}
