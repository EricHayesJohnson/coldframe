/**
 * Prisma Seed Script
 * Generates fake sensor readings to test e2e data pipeline
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = Date.now();

  const readings = Array.from({ length: 20 }).map((_, i) => ({
    sensorId: "esp32-1",
    temperatureC: 20 + Math.sin(i / 2) * 3,
    humidityPct: 50 + Math.cos(i / 3) * 10,
    pressureHPa: 1010 + i * 0.2,
    timestamp: new Date(now - (20 - i) * 3600_000), // hourly spacing
  }));

  await prisma.sensorReading.createMany({ data: readings });
  console.log("Seeded", readings.length, "sensor readings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
