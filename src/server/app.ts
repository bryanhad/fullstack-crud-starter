import express, { Application } from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { apiRouter } from "./routes/api.route";
import { viewRouter } from "./routes/view.route";

const app: Application = express();
const ROOT_PATH = process.cwd();

// serve static files
app.use(express.static(path.join(ROOT_PATH, "public")));

// set templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve(ROOT_PATH, "views"));

// mount JSON & URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routers
app.use("/api", apiRouter);
app.use("/", viewRouter);

app.use(errorHandler);

export default app;
