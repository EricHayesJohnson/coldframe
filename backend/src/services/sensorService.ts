/**
 * Sensor Service (Business Logic Layer)
 *
 * Encapsulates application-specific rules around sensor data.
 * - Validates and transforms inputs (already parsed by Zod in the route).
 * - Persists readings via the SensorModel.
 * - Future: could implement rules like deduplication, filtering, alerts.
 *
 * Services call the DB model layer, but know nothing about HTTP or Socket.IO.
 */

import { SensorReading } from "@shared/types";
import { createSensorReading, getRecentReadings } from "../db/sensorModel";

export async function handleNewReading(reading: SensorReading) {
  const saved = await createSensorReading(reading);
  return saved;
}

export async function fetchRecentReadings(limit = 10) {
  return getRecentReadings(limit);
}
