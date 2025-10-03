import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

/**
 * Catch-all 404 handler
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.warn({ path: req.originalUrl, method: req.method }, "Route not found");
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
  });
}

/**
 * Global error handler
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error({ err }, "Unhandled error");

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message, // in dev you might include this
  });
}
