"use client";

import useSWR from "swr";
import { fetchLatestReading } from "@/api/sensor";
import { SensorReading } from "@/shared/types";

export function useLatestReading() {
  const { data, error, isLoading } = useSWR<SensorReading | null>(
    "/api/sensor/latest",
    fetchLatestReading,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  return {
    latest: data,
    isLoading,
    isError: !!error,
  };
}
