import { Router } from "express";

const viewRouter: Router = Router();

viewRouter.get("/", (req, res) => {
   res.render("layouts/main", {
      title: "Home",
      content: "../pages/home", // inject the page into layout
   });
});

export { viewRouter };
