"use client";

import { Group } from "@visx/group";
import { Polygon } from "@visx/shape";
import styles from "./StatusBadge.module.css";

type StatusBadgeProps = {
  status: "live" | "awaiting" | "disconnected";
  size?: number;
};

export const StatusBadge = ({ status, size = 28 }: StatusBadgeProps) => {
  const colors = {
    live: "#4ade80",
    awaiting: "#facc15",
    disconnected: "#f87171",
  } as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-25 -25 50 50"
      className={`${styles.badge} ${styles[status]}`}
    >
      <Group>
        <Polygon sides={8} radius={20} fill={colors[status]} />
      </Group>
    </svg>
  );
};
