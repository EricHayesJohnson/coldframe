import { SensorReading } from "../shared/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/**
 * Fetch persisted sensor readings from the backend API.
 * This hits /api/sensor/history on the Node/Express backend.
 *
 * @param rangeHours number of hours of history to retrieve
 * @returns Promise<SensorReading[]>
 */
export async function fetchSensorHistory(
  rangeHours = 24
): Promise<SensorReading[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/sensor/history?range=${rangeHours}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // disable Next.js caching
      }
    );

    if (!res.ok) {
      console.error("fetchSensorHistory HTTP error:", res.status);
      return [];
    }

    const data = (await res.json()) as SensorReading[];

    // Normalize timestamps
    return data.map((d) => ({
      ...d,
      timestamp: new Date(d.timestamp).toISOString(),
    }));
  } catch (err) {
    console.error("fetchSensorHistory failed:", err);
    return [];
  }
}

/**
 * Fetch the most recent reading (latest only)
 */
export async function fetchLatestReading(): Promise<SensorReading | null> {
  try {
    const res = await fetch(`/api/sensor/latest`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    console.log("Fetching history from", process.env.NEXT_PUBLIC_API_URL);

    if (!res.ok) {
      console.error("fetchLatestReading HTTP error:", res.status);
      return null;
    }

    const data = (await res.json()) as SensorReading;
    return { ...data, timestamp: new Date(data.timestamp).toISOString() };
  } catch (err) {
    console.error("fetchLatestReading failed:", err);
    return null;
  }
}
