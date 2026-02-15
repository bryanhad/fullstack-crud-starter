import { HttpError } from "../utils/error.util";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
   err: unknown,
   _req: Request,
   res: Response,
   _next: NextFunction,
) {
   // Handle invaid JSON (body-parser)
   if (
      typeof err === "object" &&
      err !== null &&
      "type" in err &&
      err.type === "entity.parse.failed"
   ) {
      return res.status(400).json({
         message: "Invalid JSON format",
      });
   }

   // Handle Zod validation errors
   if (err instanceof ZodError) {
      console.dir({ issues: err.issues }, { depth: null, colors: true });
      return res.status(400).json({
         message: "Bad Request",
         errors: err.issues.map((i) => ({
            // i.path ex. [ 'body', 'user', 'id' ]
            // will be reduced to: 'body.user.id'
            field: i.path.reduce<string>(
               (pathStr, path, i) => (pathStr += `${i > 0 ? "." : ""}${path.toString()}`),
               "",
            ),
            message: i.message,
         })),
      });
   }

   // Handle thrown HttpError
   if (err instanceof HttpError) {
      return res.status(err.statusCode).json({
         message: err.message,
      });
   }

   // Handle unknown errors
   console.error("[UNEXPECTED ERROR]", err);
   res.status(500).json({ message: "Internal Server Error" });
}
