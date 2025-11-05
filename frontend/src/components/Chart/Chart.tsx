"use client";

import {
  XYChart,
  Axis,
  Grid,
  LineSeries,
  Tooltip,
  buildChartTheme,
} from "@visx/xychart";
import { SensorReading } from "@/shared/types";
import { useTrendsData } from "@/context/TrendsContext";
import styles from "./Chart.module.css";
import { cToF } from "@/utils/temperature";

const xAccessor = (d: SensorReading) => new Date(d.timestamp).getTime();
const yAccessor = (d: SensorReading) => d.temperatureC;

export function Chart() {
  const { data, isLoading } = useTrendsData();

  const chartTheme = buildChartTheme({
    backgroundColor: "var(--accent-orange)",
    colors: ["var(--accent-cyan)"],
    gridColor: "var(--color-border)",
    gridColorDark: "var(--color-border)",
    tickLength: 4,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.chartSkeleton}>
          <div className={styles.loadingText}>Loading trend data</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <XYChart
        height={480}
        xScale={{ type: "time" }}
        yScale={{ type: "linear", zero: false, nice: true }}
        theme={chartTheme}
      >
        <Grid columns rows className={styles.grid} />

        <Axis
          orientation="bottom"
          numTicks={4}
          // label="Time"
          stroke="var(--color-border)"
          tickStroke="var(--color-border)"
          tickFormat={(v) => {
            const d = new Date(v as number);
            const hours = d.getHours();
            const day = d.getDate();
            const month = d.toLocaleString("en-US", { month: "short" });
            return hours === 0
              ? `${month} ${day}`
              : d.toLocaleTimeString([], { hour: "numeric" });
          }}
          tickLabelProps={() => ({
            fill: "var(--color-text-secondary)",
            fontSize: 11,
            textAnchor: "middle",
            dy: "0.25em",
          })}
        />

        <Axis
          orientation="left"
          label="Temp"
          stroke="var(--color-border)"
          tickStroke="var(--color-border)"
          tickFormat={(v) => `${Math.round(cToF(v as number))}`}
          tickLabelProps={() => ({
            fill: "var(--color-text-secondary)",
            fontSize: 11,
            textAnchor: "end",
            dx: "-0.25em",
            dy: "0.25em",
          })}
        />

        <LineSeries
          dataKey="Temperature"
          data={data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          stroke="var(--accent-cyan)"
          strokeWidth={3}
        />

        <Tooltip<SensorReading>
          showSeriesGlyphs
          snapTooltipToDatumX
          className={styles.tooltipContainer}
          renderTooltip={({ tooltipData }) => {
            const d = tooltipData?.nearestDatum?.datum as
              | SensorReading
              | undefined;
            if (!d) return null;
            return (
              <div className={styles.tooltip}>
                <div>{cToF(d.temperatureC).toFixed(1)} °F</div>
                <div className={styles.tooltipTime}>
                  {new Date(d.timestamp).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          }}
        />
      </XYChart>
      <p className={styles.disclaimer}>
        Trend data currently displays a <strong>rolling 48-hour window</strong>.
        Future versions will support <strong>custom time frames</strong> for
        deeper seasonal and micro-climate insights.
      </p>
    </div>
  );
}
