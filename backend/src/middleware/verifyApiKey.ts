import { Request, Response, NextFunction } from "express";

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");
  const validKeys = (process.env.SENSOR_API_KEYS || "")
    .split(",")
    .map((k) => k.trim());

  if (!key || !validKeys.includes(key)) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
}
