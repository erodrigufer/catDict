import { Request, Response, NextFunction } from "express";

const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.header("Authorization");

  if (!authToken || authToken !== "eduardo_token") {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  next();
};

export default checkAuthorization;
