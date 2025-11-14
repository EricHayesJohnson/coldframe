"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import styles from "./ArchitectureDiagram.module.css";
import { nodes, edges } from "./diagramData";

export function ArchitectureDiagram() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

  return (
    <div className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitViewOptions={{ padding: isMobile ? 0 : 0.1 }}
        defaultViewport={
          isMobile ? { x: -12, y: 60, zoom: 0.5 } : { x: 130, y: 60, zoom: 1 }
        }
        defaultEdgeOptions={{
          labelBgPadding: [6, 3],
          labelBgBorderRadius: 2,
          labelBgStyle: { fill: "#fff" },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} color="#eee" />
        <div className={styles.controlsWrapper}>
          <Controls />
        </div>
      </ReactFlow>
    </div>
  );
}
