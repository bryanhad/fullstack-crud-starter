import { Server } from "http";
import { env } from "./env.util";

export function shutdown(httpServer: Server, signal: string) {
   console.log(`${signal} received. Shutting down gracefully...`);
   httpServer.close(() => {
      console.log("Server stopped.");
      process.exit(0);
   });
}

export function handleHttpServerError(err: NodeJS.ErrnoException) {
   if (err.code === "EADDRINUSE") {
      console.error(`Port ${env.PORT} is already in use.`);
      process.exit(1);
   } else {
      throw err;
   }
}
