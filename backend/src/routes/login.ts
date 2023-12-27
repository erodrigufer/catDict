import { Router } from "express";
import express from "express";
import asyncErrorHandling from "../middleware/asyncErrorHandling";
import { AUTH_PASSWORD, AUTH_USERNAME } from "../startup/env";
import { AUTH_TOKEN } from "../server";

const login = Router();
// Parse the requests bodies as json.
login.use(express.json());
login.post(
  "",
  asyncErrorHandling(async (req, res) => {
    const authCredentials = req.body;
    if (
      authCredentials.username === AUTH_USERNAME &&
      authCredentials.password === AUTH_PASSWORD
    ) {
      res.set("x-auth-token", AUTH_TOKEN).send({ authToken: "ok" });
    } else {
      // 401 is Unauthorized.
      res.status(401).json({ error: "Invalid authorization credentials" });
    }
  }),
);

export default login;
