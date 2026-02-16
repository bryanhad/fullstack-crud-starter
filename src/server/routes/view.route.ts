import { viewController } from "../controllers/view.controller";
import { Router } from "express";

const viewRouter: Router = Router();

viewRouter.get("/", viewController.handleHomePage);
viewRouter.get("/about", viewController.handleAboutPage);
viewRouter.get("/scan-test", viewController.handleScanTestPage);

export { viewRouter };
