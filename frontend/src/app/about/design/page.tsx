import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { DataJourney } from "@/components/DataJourney";

export default function DesignPage() {
  return (
    <section>
      <h2>Architecture</h2>
      <ArchitectureDiagram />
      <p>
        The above diagram shows the data flow for a single sensor node. The
        microcontroller and sensor collect environmental readings and send them
        as JSON over HTTP to the backend API every 60 seconds. The backend
        broadcasts each reading in real time over a WebSocket connection and
        writes a payload to long-term storage once per hour. The web dashboard
        consumes both streams: live data on the Feeds page and persistent data
        on the Trends page.
      </p>
      <h2 style={{ marginTop: "32px" }}>Data Journey</h2>
      <DataJourney />
    </section>
  );
}
