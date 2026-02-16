import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { apiRouter } from "./routes/api.route";
import { viewRouter } from "./routes/view.route";
import { mountViewRouterAssets } from "./utils/app.util";
import path from "path";

const app: Application = express();

// set templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// mount JSON & URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routers
app.use("/api", apiRouter);
mountViewRouterAssets(app);
app.use("/", viewRouter);

app.use(errorHandler);

export default app;
