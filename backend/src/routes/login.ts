import { Router } from "express";
import express from "express";
import asyncErrorHandling from "../middleware/asyncErrorHandling";

const login = Router();
login.use(express.json());
login.post(
  "",
  asyncErrorHandling(async (req, res) => {
    const authCredentials = req.body;
    if (
      authCredentials.username === "eduardo" &&
      authCredentials.password === "rodriguez"
    ) {
      res.set("x-token", "eduardo_token").send({ authToken: "ok" });
    } else {
      res.status(401).json({ error: "Invalid authorization credentials" });
    }
  }),
);

export default login;
