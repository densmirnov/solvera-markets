import { useEffect, useState } from "react";
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
}

export default function IntentsPage() {
  const [data, setData] = useState<Intent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiGet<IntentResponse>("/intents")
      .then((payload) => {
        if (!active) return;
        setData(payload.data || []);
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
  }, []);

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
                <Link to={`/monitor/intents/${intent.id}`}>{formatAddress(intent.id)}</Link>
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
    </div>
  );
}
