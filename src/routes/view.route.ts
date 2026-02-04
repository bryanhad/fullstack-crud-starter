import * as viewController from "@/controller/view.controller";
import { Router } from "express";

const viewRouter: Router = Router();

viewRouter.get("/", viewController.handleHomePage);
viewRouter.get("/about", viewController.handleAboutPage);

export { viewRouter };
