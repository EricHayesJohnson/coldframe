"use client";

import React from "react";
import {
  XYChart,
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
} from "@visx/xychart";
import { useSocketData } from "@/context/SocketContext";
import { SensorReading } from "@shared/types";

// Accessors
const xAccessor = (d: SensorReading) =>
  d.timestamp ? new Date(d.timestamp).getTime() : 0;
const yTemp = (d: SensorReading) => d.temperatureC;
const yHumidity = (d: SensorReading) => d.humidityPct;

export function Chart() {
  const { history } = useSocketData();

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <XYChart
        height={500}
        xScale={{ type: "linear" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid columns={true} rows={true} />
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />

        <AnimatedLineSeries
          dataKey="Temperature"
          data={history}
          xAccessor={xAccessor}
          yAccessor={yTemp}
        />

        <AnimatedLineSeries
          dataKey="Humidity"
          data={history}
          xAccessor={xAccessor}
          yAccessor={yHumidity}
        />

        <Tooltip<SensorReading>
          showSeriesGlyphs
          renderTooltip={({ tooltipData }) => {
            const d = tooltipData?.nearestDatum?.datum as
              | SensorReading
              | undefined;

            return d ? (
              <div
                style={{
                  background: "white",
                  padding: "4px",
                  border: "1px solid #ccc",
                  fontSize: "0.85rem",
                }}
              >
                <div>🌡 Temp: {d.temperatureC.toFixed(1)} °C</div>
                <div>💧 Humidity: {d.humidityPct.toFixed(1)} %</div>
                {d.timestamp && (
                  <div>🕒 {new Date(d.timestamp).toLocaleTimeString()}</div>
                )}
              </div>
            ) : null;
          }}
        />
      </XYChart>
    </div>
  );
}
