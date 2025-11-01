import { SensorReading } from "@/shared/types";

export type ConnectionStatus = "awaiting" | "live" | "disconnected";

interface ConnectionStatusArgs {
  fromSocket?: SensorReading | null;
  fromStore?: SensorReading | null;
  isLoading?: boolean;
}

export function getStatus({
  fromSocket,
  fromStore,
  isLoading,
}: ConnectionStatusArgs): {
  status: ConnectionStatus;
  lastUpdated: string | null;
} {
  let status: ConnectionStatus = "awaiting";
  let lastUpdated: string | null = null;

  if (fromSocket) {
    status = "live";
    lastUpdated = fromSocket.timestamp;
  } else if (isLoading) {
    status = "awaiting";
  } else if (fromStore) {
    status = "awaiting";
    lastUpdated = fromStore.timestamp;
  } else {
    status = "disconnected";
  }

  return { status, lastUpdated };
}
