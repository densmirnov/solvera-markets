import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../lib/api";
import { formatAddress, formatAmount } from "../lib/format";

interface IntentDetail {
  id: string;
  state: string;
  tokenOut: string;
  rewardToken: string;
  minAmountOut: string;
  rewardAmount: string;
  initiator: string;
  payer: string;
  verifier: string;
  winner?: string;
  winnerAmountOut?: string;
}

interface Offer {
  id: string;
  solver: string;
  amountOut: string;
  timestamp: string;
}

export default function IntentDetailPage() {
  const { id } = useParams();
  const [intent, setIntent] = useState<IntentDetail | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [nextSteps, setNextSteps] = useState<
    { action: string; role?: string; description?: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    Promise.all([
      apiGet<{
        data: IntentDetail;
        next_steps?: { action: string; role?: string; description?: string }[];
      }>(`/intents/${id}`),
      apiGet<{ data: Offer[] }>(`/intents/${id}/offers`),
    ])
      .then(([intentPayload, offersPayload]) => {
        if (!active) return;
        setIntent(intentPayload.data);
        setNextSteps(intentPayload.next_steps || []);
        setOffers(offersPayload.data || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load intent");
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return <div className="notice">{error}</div>;
  }

  if (!intent) {
    return <p>Loading intent…</p>;
  }

  return (
    <div>
      <Link to="/monitor/intents">← Back to intents</Link>
      <h2 className="section-title">Intent {formatAddress(intent.id)}</h2>
      <div className="card-grid">
        <div className="card">
          <h3>Status</h3>
          <p className="section-copy">{intent.state}</p>
        </div>
        <div className="card">
          <h3>Reward</h3>
          <p className="section-copy">{formatAmount(intent.rewardAmount)}</p>
        </div>
        <div className="card">
          <h3>Minimum out</h3>
          <p className="section-copy">{formatAmount(intent.minAmountOut)}</p>
        </div>
        <div className="card">
          <h3>Verifier</h3>
          <p className="section-copy">{formatAddress(intent.verifier)}</p>
        </div>
        <div className="card">
          <h3>Winner</h3>
          <p className="section-copy">{formatAddress(intent.winner)}</p>
          <p className="section-copy">{formatAmount(intent.winnerAmountOut)}</p>
        </div>
      </div>

      <h3>Offers</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Solver</th>
            <th>Amount out</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{formatAddress(offer.solver)}</td>
              <td>{formatAmount(offer.amountOut)}</td>
              <td>
                {new Date(Number(offer.timestamp) * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!offers.length && <div className="notice">No offers yet.</div>}

      {nextSteps.length ? (
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
