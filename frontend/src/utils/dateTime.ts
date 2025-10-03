/**
 * Format an ISO timestamp into a local time string
 * Example: "2025-09-29T12:20:53.266Z" → "8:20:53 AM"
 */
export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString();
}

/**
 * Format an ISO timestamp into "Sep 29 2025 - 14:20"
 */
export function formatDateTime(isoString: string): string {
  const formatted = new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formatted.replace(",", "").replace(",", " -");
}

/**
 * Return relative time like "2 minutes ago"
 */
export function timeAgo(isoString: string): string {
  const now = Date.now();
  const past = new Date(isoString).getTime();
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
