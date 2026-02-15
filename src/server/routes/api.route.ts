import { Router } from "express";
import { usersRouter } from "./api/users.route";

const apiRouter: Router = Router();

apiRouter.use("/users", usersRouter);

export { apiRouter };
