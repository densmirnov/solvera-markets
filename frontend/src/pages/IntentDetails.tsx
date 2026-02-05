import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../lib/api";
import {
  explorerAddressUrl,
  explorerTxUrl,
  formatAddress,
  formatTokenAmount,
} from "../lib/format";
import { H1, P } from "../components/ui/Typography";

interface IntentDetail {
  id: string;
  state: string;
  tokenOut: string;
  rewardToken: string;
  minAmountOut: string;
  rewardAmount: string;
  initiator: string;
  payer: string;
  verifier?: string | null;
  winner?: string | null;
  winnerAmountOut?: string | null;
  bondAmount?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  txHash?: string | null;
}

interface IntentDetailResponse {
  data: IntentDetail | null;
}

export default function IntentDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState<IntentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Missing intent id");
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    apiGet<IntentDetailResponse>(`/intents/${id}`)
      .then((payload) => {
        if (!active) return;
        setData(payload.data ?? null);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load intent");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const reward = data
    ? formatTokenAmount(data.rewardAmount, data.rewardToken)
    : null;
  const minOut = data
    ? formatTokenAmount(data.minAmountOut, data.tokenOut)
    : null;
  const winnerOut = data?.winnerAmountOut
    ? formatTokenAmount(data.winnerAmountOut, data.tokenOut)
    : null;
  const bond = data?.bondAmount
    ? formatTokenAmount(data.bondAmount, data.rewardToken)
    : null;
  const txUrl = data?.txHash ? explorerTxUrl(data.txHash) : "";

  return (
    <div className="section-stack animate-in fade-in duration-500 marketplace-dense">
      <div className="section-stack-tight reveal delay-1">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/marketplace"
            className="button-base inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-3 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Back
          </Link>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Intent Details
          </div>
        </div>
        <H1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {data?.id ? formatAddress(data.id) : "Intent"}
        </H1>
        <P className="hero-copy text-muted-foreground max-w-2xl">
          Detailed view of the intent, participants, and on-chain metadata.
        </P>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="card-spotlight surface-soft-muted marketplace-outline rounded-lg p-4 reveal delay-2">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : !data ? (
          <div className="text-muted-foreground">Intent not found.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Status
              </div>
              <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold">
                {data.state}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Reward
                </div>
                <div className="text-[13px] font-medium">{reward?.primary}</div>
                <div className="text-[11px] text-muted-foreground">
                  {reward?.secondary}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Minimum Output
                </div>
                <div className="text-[13px] font-medium">{minOut?.primary}</div>
                <div className="text-[11px] text-muted-foreground">
                  {minOut?.secondary}
                </div>
              </div>
              {winnerOut && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Winner Output
                  </div>
                  <div className="text-[13px] font-medium">
                    {winnerOut.primary}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {winnerOut.secondary}
                  </div>
                </div>
              )}
              {bond && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Bond Amount
                  </div>
                  <div className="text-[13px] font-medium">{bond.primary}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {bond.secondary}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Participants
                </div>
                <div className="space-y-2 text-[12px] font-mono">
                  <div>
                    Initiator:{" "}
                    <a
                      className="hover:underline"
                      href={explorerAddressUrl(data.initiator)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {formatAddress(data.initiator)}
                    </a>
                  </div>
                  <div>
                    Payer:{" "}
                    <a
                      className="hover:underline"
                      href={explorerAddressUrl(data.payer)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {formatAddress(data.payer)}
                    </a>
                  </div>
                  {data.verifier && (
                    <div>
                      Verifier:{" "}
                      <a
                        className="hover:underline"
                        href={explorerAddressUrl(data.verifier)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {formatAddress(data.verifier)}
                      </a>
                    </div>
                  )}
                  {data.winner && (
                    <div>
                      Winner:{" "}
                      <a
                        className="hover:underline"
                        href={explorerAddressUrl(data.winner)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {formatAddress(data.winner)}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Metadata
                </div>
                <div className="space-y-2 text-[12px]">
                  <div>ID: {data.id}</div>
                  {data.txHash && (
                    <div>
                      Tx Hash:{" "}
                      <a
                        className="hover:underline font-mono"
                        href={txUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {formatAddress(data.txHash)}
                      </a>
                    </div>
                  )}
                  {data.createdAt && <div>Created: {data.createdAt}</div>}
                  {data.updatedAt && <div>Updated: {data.updatedAt}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
