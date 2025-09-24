import express, { Application } from "express";
import { usersRouter } from "@/routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import path from "path";
import { viewRouter } from "./routes/view.route";

const app: Application = express();

// serve static files
app.use(express.static(path.join(__dirname, "../public")));

// set templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// mount JSON & URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.get("/message", async (req, res) => {
   await new Promise((res) => setTimeout(res, 1000));
   res.send("<p class='text-yellow-500'>Hello from the server! 🎉</p>");
});
app.use("/users", usersRouter);
app.use("/", viewRouter);

app.use(errorHandler);

export default app;
