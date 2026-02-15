import express, { Application } from "express";
import path from "path";
import { env } from "./env.util";

export function viewRouterBootstrap(app: Application) {
   // mount vendor assets
   app.use("/vendor/htmx", express.static(path.resolve("node_modules/htmx.org/dist")));

   // mount locals (global vars for ejs)
   app.locals.clientEntry = (entryName: string) => {
      const src =
         env.NODE_ENV === "development"
            ? `${env.VITE_DEV_SERVER}/ts/${entryName}.ts`
            : `/js/${entryName}.js`;

      return `<script type="module" src="${src}"></script>`;
   };
}
