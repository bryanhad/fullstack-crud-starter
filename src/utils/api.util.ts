import {
   TRequestValidationSchema,
   ValidatedRequest,
} from "@/interfaces/request.interface";
import { ApiResponse } from "@/interfaces/response.interface";
import { NextFunction, Response } from "express";

/**
 * Represents an async controller function.
 * It receives a validated request and must return
 * a standardized API response (ApiResponse).
 */
type AsyncController<TSchema extends TRequestValidationSchema, TRes = unknown> = (
   req: ValidatedRequest<TSchema>,
) => Promise<ApiResponse<TRes>>;

/**
 * Represents the shape of the wrapped Express handler.
 * It follows the usual (req, res, next) signature.
 */
type ApiHandler<TSchema extends TRequestValidationSchema> = (
   req: ValidatedRequest<TSchema>,
   res: Response,
   next: NextFunction,
) => Promise<void>;

/**
 * Wraps an async controller to:
 * - enforce a consistent API response shape (ApiResponse)
 * - handle async errors by forwarding them to next()
 *
 * @param fn an async controller function that returns ApiResponse
 * @returns an Express request handler with built-in response + error handling
 */
export function createApiHandler<
   TSchema extends TRequestValidationSchema,
   TRes = unknown,
>(fn: AsyncController<TSchema, TRes>): ApiHandler<TSchema> {
   return async (req, res, next) => {
      try {
         const { message, data } = await fn(req);
         res.status(200).json({
            message: message ?? "OK",
            ...(data ? { data } : {}),
         });
      } catch (err) {
         next(err);
      }
   };
}
