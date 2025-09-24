import { TRequestValidationSchema } from "@/interfaces/request.interface";
import z from "zod";

/**
 * Base request schema.
 *
 * - Defines the required shape (params, body, query)
 * - Defaults each to optional `any`
 * - Should be extended with stricter validation in actual routes
 *
 * Example:
 * ```ts
 * export const getUserByIdSchema = baseRequestSchema.extend({
 *   params: z.object({ userId: z.coerce.number() }),
 * });
 * ```
 */
export const baseRequestSchema: TRequestValidationSchema = z.object({
   params: z.any().optional(),
   body: z.any().optional(),
   query: z.any().optional(),
});
