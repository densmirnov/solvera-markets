import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../lib/api";
import { formatAddress, formatAmount } from "../lib/format";

interface Intent {
  id: string;
  state: string;
  tokenOut: string;
  rewardToken: string;
  minAmountOut: string;
  rewardAmount: string;
  initiator: string;
  payer: string;
}

interface IntentResponse {
  data: Intent[];
  pageInfo?: { cursor: string | null; hasNext: boolean };
  next_steps?: { action: string; role?: string; description?: string }[];
}

export default function IntentsPage() {
  const [data, setData] = useState<Intent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextSteps, setNextSteps] = useState<IntentResponse["next_steps"]>([]);
  const [filters, setFilters] = useState({
    state: "",
    tokenOut: "",
    rewardToken: "",
  });

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.state) params.set("state", filters.state);
    if (filters.tokenOut) params.set("tokenOut", filters.tokenOut);
    if (filters.rewardToken) params.set("rewardToken", filters.rewardToken);
    apiGet<IntentResponse>(`/intents?${params.toString()}`)
      .then((payload) => {
        if (!active) return;
        setData(payload.data || []);
        setNextSteps(payload.next_steps || []);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load intents");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filters.rewardToken, filters.state, filters.tokenOut]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return <p>Loading intents…</p>;
  }

  if (error) {
    return <div className="notice">{error}</div>;
  }

  return (
    <div>
      <h2 className="section-title">Intents</h2>
      <p className="section-copy">Latest intents from the indexer feed.</p>
      <div className="filter-row">
        <input
          className="input"
          placeholder="State (OPEN, SELECTED...)"
          value={filters.state}
          onChange={(event) =>
            setFilters({ ...filters, state: event.target.value })
          }
        />
        <input
          className="input"
          placeholder="Token out"
          value={filters.tokenOut}
          onChange={(event) =>
            setFilters({ ...filters, tokenOut: event.target.value })
          }
        />
        <input
          className="input"
          placeholder="Reward token"
          value={filters.rewardToken}
          onChange={(event) =>
            setFilters({ ...filters, rewardToken: event.target.value })
          }
        />
        <button className="button secondary" onClick={load} type="button">
          Apply filters
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Intent</th>
            <th>Status</th>
            <th>Reward</th>
            <th>Min Out</th>
            <th>Initiator</th>
          </tr>
        </thead>
        <tbody>
          {data.map((intent) => (
            <tr key={intent.id}>
              <td>
                <Link to={`/monitor/intents/${intent.id}`}>
                  {formatAddress(intent.id)}
                </Link>
              </td>
              <td>{intent.state}</td>
              <td>{formatAmount(intent.rewardAmount)}</td>
              <td>{formatAmount(intent.minAmountOut)}</td>
              <td>{formatAddress(intent.initiator)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <div className="notice">No intents found.</div>}
      {nextSteps?.length ? (
        <div className="card">
          <h3>next_steps</h3>
          <ul>
            {nextSteps.map((step) => (
              <li key={`${step.role || "agent"}-${step.action}`}>
                <strong>{step.role || "agent"}:</strong> {step.action}
                {step.description ? ` — ${step.description}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
