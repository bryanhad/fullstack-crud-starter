import {
   TRequestValidationSchema,
   ValidatedRequestHandler,
} from "@/interfaces/request.interface";

/**
 * Creates an Express middleware that validates incoming requests against a Zod schema.
 *
 * - The schema must follow the `TRequestValidationSchema` shape (params, body, query).
 *
 * - On success, the request object is overwritten with the parsed/validated values
 *   (req.params and req.body). `req.query` is only validated but not reassigned,
 *   since Express makes it a read-only getter.
 *
 * - On failure, the Zod error is passed to the next error handler.
 *
 * @param schema Zod schema describing the request shape (params, body, query).
 * @returns Middleware that validates and type-narrows the Express `Request`.
 */
export const validateRequest: <T extends TRequestValidationSchema>(
   schema: T,
) => ValidatedRequestHandler<T> = (schema) => (req, _res, next) => {
   try {
      // enforce the request shape
      const parsed = schema.parse({
         params: req.params,
         body: req.body,
         query: req.query,
      });

      // overwrite with validated values
      req.params = parsed.params ?? {};
      req.body = parsed.body ?? {};

      next();
   } catch (err) {
      next(err);
   }
};
