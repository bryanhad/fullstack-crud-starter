import { HttpError } from "@/utils/error.util";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
   err: unknown,
   _req: Request,
   res: Response,
   _next: NextFunction,
) {
   // Handle Zod validation errors
   if (err instanceof ZodError) {
      return res.status(400).json({
         message: "Bad Request",
         errors: err.issues.map((i) => ({
            field: i.path[0],
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
