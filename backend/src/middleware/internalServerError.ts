import winston from "winston";
import { Request, Response, NextFunction } from "express";

export default function handleInternalServerError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  winston.error(err.message, err);
  res.status(500).json({ error: "An internal server error took place." });
}
