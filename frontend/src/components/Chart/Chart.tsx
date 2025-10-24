"use client";

import React from "react";
import {
  XYChart,
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
} from "@visx/xychart";
import { SensorReading } from "@coldframe/shared/types";
import { useTrendsData } from "@/context/TrendsContext";

const xAccessor = (d: SensorReading) => new Date(d.timestamp).getTime();
const yTemp = (d: SensorReading) => d.temperatureC;
const yHumidity = (d: SensorReading) => d.humidityPct;

export function Chart() {
  const { data, isLoading } = useTrendsData();

  if (isLoading) {
    return <p className="text-gray-500 mt-4">Loading trend data...</p>;
  }

  if (!data?.length) {
    return <p className="text-gray-500 mt-4">No data available.</p>;
  }

  return (
    <div className="w-full h-[500px]">
      <XYChart
        height={500}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid columns rows />
        <AnimatedAxis orientation="bottom" label="Time" />
        <AnimatedAxis orientation="left" label="Value" />

        <AnimatedLineSeries
          dataKey="Temperature (°C)"
          data={data}
          xAccessor={xAccessor}
          yAccessor={yTemp}
        />

        <AnimatedLineSeries
          dataKey="Humidity (%)"
          data={data}
          xAccessor={xAccessor}
          yAccessor={yHumidity}
        />

        <Tooltip<SensorReading>
          showSeriesGlyphs
          renderTooltip={({ tooltipData }) => {
            const d = tooltipData?.nearestDatum?.datum as
              | SensorReading
              | undefined;
            if (!d) return null;
            return (
              <div className="bg-white border border-gray-300 p-1.5 text-sm rounded">
                <div>🌡 Temp: {d.temperatureC.toFixed(1)} °C</div>
                <div>💧 Humidity: {d.humidityPct.toFixed(1)} %</div>
                <div className="text-gray-500">
                  {new Date(d.timestamp).toLocaleTimeString()}
                </div>
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
}
