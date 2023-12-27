import { Request, Response, NextFunction } from "express";
import { AUTH_TOKEN } from "../server";

const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.header("Authorization");

  if (!authToken || authToken !== AUTH_TOKEN) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  next();
};

export default checkAuthorization;
