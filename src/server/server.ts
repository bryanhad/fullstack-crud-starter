import http from "http";
import app from "./app";
import { env } from "./utils/env.util";
import { checkDBConnection, handleServerError, shutdown } from "./utils/server.util";

const server = http.createServer(app);

process.on("SIGINT", () => shutdown(server, "SIGINT"));
process.on("SIGTERM", () => shutdown(server, "SIGTERM"));

async function startServer() {
   await checkDBConnection();

   server.on("error", handleServerError);
   server.listen(env.APP_PORT, async () => {
      console.log(`Server is running on http://localhost:${env.APP_PORT}`);
   });
}

startServer().catch((err) => {
   console.error("Server start failed:", err);
   process.exit(1);
});
