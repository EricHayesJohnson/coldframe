/**
 * Coldframe Prisma Seed Script
 * Generates realistic, spiky sensor data for visual testing
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const HOURS = 48; // how many hours of data to generate
  const now = Date.now();

  // Helper: random drift to avoid perfect sine/cosine smoothness
  const randomJitter = (scale = 1) => (Math.random() - 0.5) * scale;

  const readings = Array.from({ length: HOURS }).map((_, i) => {
    const t = new Date(now - (HOURS - i) * 3600_000); // 1-hour spacing

    // Temperature oscillates with day/night rhythm + random spikes
    const baseTemp = 18 + Math.sin(i / 3) * 6 + randomJitter(2);
    // Humidity inverse-correlates a bit with temp
    const baseHumidity = 65 - Math.sin(i / 3) * 10 + randomJitter(5);
    // Pressure drifts slowly, minor jitter
    const basePressure = 1008 + Math.cos(i / 10) * 8 + randomJitter(1);

    return {
      sensorId: "esp32-1",
      temperatureC: Number(baseTemp.toFixed(2)),
      humidityPct: Number(baseHumidity.toFixed(2)),
      pressureHPa: Number(basePressure.toFixed(2)),
      timestamp: t,
    };
  });

  await prisma.sensorReading.deleteMany(); // clear old test data
  await prisma.sensorReading.createMany({ data: readings });

  console.log(`Seeded ${readings.length} readings spanning ${HOURS}h`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
