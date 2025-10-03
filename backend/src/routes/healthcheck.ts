import { Router } from "express";

export const healthcheckRoutes = Router();

healthcheckRoutes.get("/", (_req, res) => {
  res.send("Coldframe backend running");
});
