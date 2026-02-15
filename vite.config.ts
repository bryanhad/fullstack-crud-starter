import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
   root: "src/client",
   build: {
      outDir: path.resolve(process.cwd(), "public"),
      emptyOutDir: false,
      rollupOptions: {
         input: {
            index: path.resolve(process.cwd(), "src/client/ts/index.ts"),
         },
         output: {
            entryFileNames: "js/[name].js",
         },
      },
   },
});
