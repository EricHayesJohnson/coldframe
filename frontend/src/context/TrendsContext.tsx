"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { SensorReading } from "@shared/types";
import { fetchSensorHistory } from "@/api/sensor";
import { socket } from "@/lib/socketClient";
import { SocketEvents } from "@shared/types";

type TrendsContextValue = {
  data: SensorReading[];
  range: number;
  isLoading: boolean;
  refresh: (hours?: number) => void;
};

const TrendsContext = createContext<TrendsContextValue | undefined>(undefined);

export const TrendsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<SensorReading[]>([]);
  const [range, setRange] = useState(24);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(
    async (hours = range) => {
      setIsLoading(true);
      const readings = await fetchSensorHistory(hours);
      setData(readings);
      setRange(hours);
      setIsLoading(false);
    },
    [range]
  );

  // Initial load
  useEffect(() => {
    loadData(range);
  }, [loadData, range]);

  // Optional: listen for socket updates (once/hour later)
  useEffect(() => {
    socket.on(SocketEvents.SENSOR_UPDATE, (reading: SensorReading) => {
      // Replace this later with hourly refresh trigger
      if (new Date(reading.timestamp).getMinutes() === 0) {
        loadData(range);
      }
    });
    return () => {
      socket.off(SocketEvents.SENSOR_UPDATE);
    };
  }, [loadData, range]);

  const value = React.useMemo(
    () => ({
      data,
      range,
      isLoading,
      refresh: loadData,
    }),
    [data, range, isLoading, loadData]
  );

  return (
    <TrendsContext.Provider value={value}>{children}</TrendsContext.Provider>
  );
};

export const useTrendsData = () => {
  const ctx = useContext(TrendsContext);
  if (!ctx)
    throw new Error("useTrendsData must be used within a TrendsProvider");
  return ctx;
};
