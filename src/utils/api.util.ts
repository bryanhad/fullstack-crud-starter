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
export type ApiHandler<TSchema extends TRequestValidationSchema> = (
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

/**
 * Creates an Express handler for server-rendered views.
 *
 * - renders a partial view for HTMX requests
 * - renders the main layout for full page requests
 * - supports sync or async data preparation
 *
 * @param childHtmlPath path to the child/partial view template
 * @param renderDataFn function to prepare template data (HTMX-aware)
 * @returns An Express-compatible view handler
 */
type RenderData = Record<string, unknown>;
export function createViewHandler<TSchema extends TRequestValidationSchema>(
   childHtmlPath: string,
   renderDataFn: (
      req: ValidatedRequest<TSchema>,
      isHtmx: boolean,
   ) => RenderData | Promise<RenderData>,
): ApiHandler<TSchema> {
   return async (req, res, next) => {
      try {
         const isHtmx = req.get("HX-Boosted") === "true";

         const renderData = await renderDataFn(req, isHtmx);

         if (isHtmx) {
            return res.render(childHtmlPath, renderData);
         }

         return res.render("layouts/main", {
            ...renderData,
            childHtmlPath: `../${childHtmlPath}`,
         });
      } catch (err) {
         next(err);
      }
   };
}
