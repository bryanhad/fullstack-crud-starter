import express, { Application } from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { apiRouter } from "./routes/api.route";
import { viewRouter } from "./routes/view.route";
import { viewRouterBootstrap } from "./utils/app.util";

const app: Application = express();

// serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// set templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// mount JSON & URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routers
app.use("/api", apiRouter);

viewRouterBootstrap(app);
app.use("/", viewRouter);

app.use(errorHandler);

export default app;
