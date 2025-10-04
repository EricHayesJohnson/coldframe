/**
 * Sensor Model (DB Layer)
 *
 * Responsible for raw database operations related to SensorReadings.
 * This is the only place that knows about Prisma directly.
 *
 * The model layer should contain **no business logic**.
 * It just translates to/from the database schema.
 */

import { prisma } from "./prisma";
import { SensorReading } from "@shared/types";

export async function createSensorReading(reading: SensorReading) {
  return prisma.sensorReading.create({
    data: {
      sensorId: reading.sensorId,
      temperatureC: reading.temperatureC,
      humidityPct: reading.humidityPct,
      pressureHPa: reading.pressureHPa,
      timestamp: new Date(reading.timestamp),
    },
  });
}

export async function getRecentReadings(limit = 10): Promise<SensorReading[]> {
  const rows = await prisma.sensorReading.findMany({
    orderBy: { timestamp: "desc" },
    take: limit,
  });

  // Convert Prisma Dates → ISO strings for the shared type
  return rows.map((r) => ({
    ...r,
    timestamp: r.timestamp.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));
}
