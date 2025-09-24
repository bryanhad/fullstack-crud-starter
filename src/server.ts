if (process.env.NODE_ENV !== "production") {
   // eslint-disable-next-line @typescript-eslint/no-require-imports
   require("dotenv").config();
}
import http from "http";
import app from "./app";
import { handleHttpServerError, shutdown } from "./utils/server.util";
import { env } from "./utils/env.util";

const server = http.createServer(app);

process.on("SIGINT", () => shutdown(server, "SIGINT"));
process.on("SIGTERM", () => shutdown(server, "SIGTERM"));

server.on("error", handleHttpServerError);

server.listen(env.PORT, () => {
   console.log(`Server is running on http://localhost:${env.PORT}`);
});
