/**
 * Sensor Service (Business Logic Layer)
 *
 * Decides what to do with a new sensor reading:
 *  - Always record the latest timestamp for throttling
 *  - Persist to DB only once per WRITE_INTERVAL
 *
 * No Express or Socket.IO dependencies.
 */

import { SensorReading } from "../types";
import {
  createSensorReading,
  getLatestReading,
  getReadingsSince,
} from "../db/sensorModel";
import { subHours } from "date-fns";
import { logger } from "../utils/logger";

const ONE_MINUTE = 60 * 1000;
const WRITE_INTERVAL_MS =
  Number(process.env.DB_WRITE_INTERVAL_MINUTES ?? 60) * ONE_MINUTE;

const lastWriteBySensor = new Map<string, number>();

export async function handleNewReading(reading: SensorReading) {
  const now = Date.now();
  const last = lastWriteBySensor.get(reading.sensorId) ?? 0;
  const elapsed = now - last;

  if (elapsed >= WRITE_INTERVAL_MS) {
    try {
      await createSensorReading(reading);
      lastWriteBySensor.set(reading.sensorId, now);
      logger.info(
        {
          sensorId: reading.sensorId,
          elapsedMin: (elapsed / ONE_MINUTE).toFixed(1),
        },
        "Persisted hourly reading"
      );
    } catch (err) {
      logger.error(err, "Failed to persist sensor reading");
    }
  } else {
    logger.debug(
      {
        sensorId: reading.sensorId,
        sinceLastWriteMin: (elapsed / ONE_MINUTE).toFixed(1),
      },
      "Skipped DB write (throttled)"
    );
  }
}

/** Fetch readings from the past N hours. */
export async function fetchRecentReadings(hours = 24) {
  const since = subHours(new Date(), hours);
  return getReadingsSince(since);
}

export async function fetchLatestReading() {
  return getLatestReading();
}
