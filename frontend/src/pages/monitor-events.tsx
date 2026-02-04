import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { formatAddress, formatAmount } from "../lib/format";

interface EventLog {
  id: string;
  eventType: string;
  intent?: { id: string };
  solver?: string;
  amountOut?: string;
  feeAmount?: string;
  refundAmount?: string;
  bondAmount?: string;
  rewardAmount?: string;
  blockTimestamp?: string;
  txHash?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    intentId: "",
    eventType: "",
    solver: "",
  });

  const load = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.intentId) params.set("intentId", filters.intentId);
    if (filters.eventType) params.set("eventType", filters.eventType);
    if (filters.solver) params.set("solver", filters.solver);

    apiGet<{ data: EventLog[] }>(`/events?${params.toString()}`)
      .then((payload) => {
        setEvents(payload.data || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load events");
      });
  }, [filters.eventType, filters.intentId, filters.solver]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h2 className="section-title">Event log</h2>
      <p className="section-copy">
        Derived from on-chain events indexed by the subgraph.
      </p>

      <div className="filter-row">
        <input
          className="input"
          placeholder="Intent ID"
          value={filters.intentId}
          onChange={(event) =>
            setFilters({ ...filters, intentId: event.target.value })
          }
        />
        <input
          className="input"
          placeholder="Event type"
          value={filters.eventType}
          onChange={(event) =>
            setFilters({ ...filters, eventType: event.target.value })
          }
        />
        <input
          className="input"
          placeholder="Solver"
          value={filters.solver}
          onChange={(event) =>
            setFilters({ ...filters, solver: event.target.value })
          }
        />
        <button className="button secondary" onClick={load} type="button">
          Apply filters
        </button>
      </div>

      {error && <div className="notice">{error}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Intent</th>
            <th>Solver</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.eventType}</td>
              <td>{formatAddress(event.intent?.id)}</td>
              <td>{formatAddress(event.solver)}</td>
              <td>{formatAmount(event.amountOut || event.rewardAmount)}</td>
              <td>
                {event.blockTimestamp
                  ? new Date(
                      Number(event.blockTimestamp) * 1000,
                    ).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!events.length && !error && (
        <div className="notice">No events found.</div>
      )}
    </div>
  );
}
