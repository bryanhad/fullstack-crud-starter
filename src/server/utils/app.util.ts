import express, { Application } from "express";
import path from "path";
import { env } from "./env.util";

export function mountViewRouterAssets(app: Application) {
   // serve public dir
   app.use(express.static(path.join(process.cwd(), "public")));

   // serve vendor assets
   app.locals.vendorAssets = {
      htmx: "/vendor/htmx",
   };
   app.use(
      app.locals.vendorAssets.htmx,
      express.static(path.resolve("node_modules/htmx.org/dist")),
   );

   // dynamically set client scripts where-abouts
   if (env.NODE_ENV === "production") {
      app.locals.clientScripts = `/js/index.js`;
   } else {
      app.locals.clientScripts = `${env.VITE_DEV_SERVER}/ts/index.ts`;
   }
}
