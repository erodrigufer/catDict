import { Router } from "express";
import asyncErrorHandling from "../middleware/asyncErrorHandling";

const login = Router();
login.post(
  "",
  // TODO: recheck what asyncErrorHandling does?
  asyncErrorHandling(async (_, res) => {
    res.set("x-token", "eduardo_token").send({ authToken: "ok" });
  }),
);

export default login;
