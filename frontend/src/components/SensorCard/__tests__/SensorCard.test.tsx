import { render, screen } from "@testing-library/react";
import { SensorCard } from "../SensorCard";
import { SocketContext } from "@/context/SocketContext";
import type { SensorReading } from "@coldframe/shared/types";

describe("SensorCard", () => {
  it("renders fallback text when no sensor data", () => {
    render(
      <SocketContext.Provider value={{ latestReading: null }}>
        <SensorCard />
      </SocketContext.Provider>
    );

    expect(screen.getByText("No sensor data yet...")).toBeInTheDocument();
  });

  it("renders sensor data when available", () => {
    const mockSensorData: SensorReading = {
      sensorId: "test-1",
      temperatureC: 22.5,
      humidityPct: 55,
      timestamp: "2025-09-23T12:00:00Z",
    };

    render(
      <SocketContext.Provider value={{ latestReading: mockSensorData }}>
        <SensorCard />
      </SocketContext.Provider>
    );

    expect(screen.getByText(/test-1/)).toBeInTheDocument();
    expect(screen.getByText(/22.5 °C/)).toBeInTheDocument();
    expect(screen.getByText(/55 %/)).toBeInTheDocument();
    expect(screen.getByText(/2025-09-23/)).toBeInTheDocument();
  });
});
