"use client";

/**
 * React hook to subscribe to sensor updates over Socket.IO
 *
 * Responsibilities:
 * - Connect to backend Socket.IO server
 * - Listen for "sensor:update" events
 * - Show latest reading in the dashboard
 *
 * Data flow:
 *   Backend (via /api/sensor) emits "sensor:update"
 *   → Frontend listens with socket.on("sensor:update")
 *   → React state updates and re-renders instantly
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";
import { SensorReading, SocketEvents } from "@shared/types";

const HISTORY_THRESHOLD = -99; // keep the last 100 readings;

type SocketContextValue = {
  latest: SensorReading | null;
  history: SensorReading[];
};

export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [latest, setLatest] = useState<SensorReading | null>(null);
  const [history, setHistory] = useState<SensorReading[]>([]);

  useEffect(() => {
    socket.on(SocketEvents.SENSOR_UPDATE, (data: SensorReading) => {
      setLatest(data);
      setHistory((prev) => [...prev.slice(HISTORY_THRESHOLD), data]);
    });

    return () => {
      socket.off(SocketEvents.SENSOR_UPDATE);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ latest, history }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketData = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocketData must be used within a SocketProvider");
  }
  return ctx;
};
