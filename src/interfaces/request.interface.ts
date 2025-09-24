import { Request, RequestHandler } from "express";
import { z } from "zod";

/**
 * Base Zod schema contract for request validation.
 * Requires `params`, `body`, and `query` keys.
 */
export type TRequestValidationSchema = z.ZodObject<{
   params: z.ZodTypeAny;
   body: z.ZodTypeAny;
   query: z.ZodTypeAny;
}>;

/**
 * Express RequestHandler type that enforces validated input
 * according to the given schema.
 *
 * Useful for typing controller methods.
 */
export type ValidatedRequestHandler<T extends TRequestValidationSchema> = RequestHandler<
   z.infer<T>["params"],
   unknown,
   z.infer<T>["body"],
   z.infer<T>["query"]
>;

/**
 * Express Request type that is strongly typed
 * using the given validation schema.
 *
 * - `params`, `body`, and `query` are inferred from the schema
 */
export type ValidatedRequest<T extends TRequestValidationSchema> = Request<
   z.infer<T>["params"],
   unknown,
   z.infer<T>["body"],
   z.infer<T>["query"]
>;
