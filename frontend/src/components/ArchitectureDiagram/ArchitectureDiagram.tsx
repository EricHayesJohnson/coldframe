"use client";
import { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./ArchitectureDiagram.module.css";

export function ArchitectureDiagram() {
  const nodes = useMemo(
    () => [
      // === LAYER BACKGROUNDS ===
      {
        id: "layer-sensor",
        position: { x: -100, y: -40 },
        data: {},
        className: styles.layerSensor,
        selectable: false,
        draggable: false,
      },
      {
        id: "layer-backend",
        position: { x: -100, y: 120 },
        data: {},
        className: styles.layerBackend,
        selectable: false,
        draggable: false,
      },
      {
        id: "layer-frontend",
        position: { x: -100, y: 360 },
        data: {},
        className: styles.layerFrontend,
        selectable: false,
        draggable: false,
      },

      // === NODES ===
      {
        id: "esp32",
        position: { x: 200, y: 0 },
        data: { label: "ESP32 Microcontroller" },
        className: styles.node,
      },
      {
        id: "bme280",
        position: { x: 380, y: 0 },
        data: { label: "BME280 Sensor" },
        className: styles.node,
      },
      {
        id: "api",
        position: { x: 290, y: 180 },
        data: { label: "Backend API" },
        className: styles.node,
      },
      {
        id: "socket",
        position: { x: 120, y: 320 },
        data: { label: "WebSocket Stream" },
        className: styles.node,
      },
      {
        id: "db",
        position: { x: 460, y: 320 },
        data: { label: "Database" },
        className: styles.node,
      },
      {
        id: "frontend",
        position: { x: 290, y: 480 },
        data: { label: "Web Dashboard" },
        className: styles.node,
      },
    ],
    []
  );

  const edges = useMemo(
    () => [
      {
        id: "wire",
        source: "esp32",
        target: "bme280",
        sourceHandle: "right",
        targetHandle: "left",
        style: { stroke: "#000", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },

      {
        id: "e1",
        source: "bme280",
        target: "api",
        label: "HTTPS JSON POST /api/sensor",
        animated: true,
        style: { stroke: "#ff914d", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },

      {
        id: "e2",
        source: "api",
        target: "db",
        label: "Persist to database (hourly)",
        animated: true,
        style: { stroke: "#ff914d", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },

      {
        id: "e3",
        source: "api",
        target: "socket",
        label: "Emit live reading",
        animated: true,
        style: { stroke: "#ff914d", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },

      {
        id: "e4",
        source: "socket",
        target: "frontend",
        label: "Real-time broadcast (every 60s)",
        animated: true,
        style: { stroke: "#ff914d", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },

      {
        id: "e5",
        source: "frontend",
        target: "api",
        label: "GET /api/sensor/history",
        animated: true,
        style: { stroke: "#ff914d", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ],
    []
  );

  return (
    <div className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        defaultViewport={{ x: 0, y: 0, zoom: 3.5 }}
        defaultEdgeOptions={{
          labelBgPadding: [6, 3],
          labelBgBorderRadius: 2,
          labelBgStyle: { fill: "#fff" },
        }}
      >
        <Background gap={20} color="#eee" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
