/*
  Warnings:

  - You are about to drop the column `humidity` on the `SensorReading` table. All the data in the column will be lost.
  - You are about to drop the column `pressure` on the `SensorReading` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `SensorReading` table. All the data in the column will be lost.
  - Added the required column `humidityPct` to the `SensorReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressureHPa` to the `SensorReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sensorId` to the `SensorReading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperatureC` to the `SensorReading` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SensorReading" DROP COLUMN "humidity",
DROP COLUMN "pressure",
DROP COLUMN "temperature",
ADD COLUMN     "humidityPct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pressureHPa" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sensorId" TEXT NOT NULL,
ADD COLUMN     "temperatureC" DOUBLE PRECISION NOT NULL;
