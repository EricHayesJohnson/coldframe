/**
 * Coldframe Backend - Phase 1
 *
 * Responsibilities:
 * - Express App: defines routes (HTTP API endpoints).
 * - HTTP Server: actual TCP listener that accepts requests & upgrades to WebSockets.
 * - Socket.IO Server: real-time channel layered on top of HTTP server.
 */

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import { logger } from "./utils/logger";
import { sensorRoutes } from "./routes/sensor";
import { healthcheckRoutes } from "./routes/healthcheck";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { ROUTES } from "@coldframe/shared/routes";

config(); // load .env

const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

export const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(ROUTES.SENSOR, sensorRoutes(io));
app.use(ROUTES.HEALTHCHECK, healthcheckRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  httpServer.listen(PORT, () => {
    logger.info(`Backend listening on http://0.0.0.0:${PORT}`);
  });
}
