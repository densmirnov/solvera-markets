import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../lib/api";
import {
  explorerAddressUrl,
  formatAddress,
  formatTokenAmount,
} from "../lib/format";
import { H1, P } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

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

export default function MarketplacePage() {
  const [data, setData] = useState<Intent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="section-stack animate-in fade-in duration-500">
      <div className="section-stack-tight reveal delay-1">
        <H1 className="hero-title hero-glint">Marketplace</H1>
        <P className="hero-copy text-muted-foreground max-w-2xl">
          Discover and bid on active intents.
        </P>
      </div>

      <div className="card-spotlight surface-soft-muted flex flex-wrap gap-5 items-end p-5 rounded-lg reveal delay-2">
        <div className="grid gap-2">
          <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            State
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px]"
            placeholder="e.g. OPEN"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          />
        </div>
        {/* More filters can be added here */}
        <Button onClick={load} variant="secondary">
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="table-frame surface-soft-muted rounded-lg overflow-hidden reveal delay-3">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  ID
                </th>
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  State
                </th>
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Reward
                </th>
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Min Output
                </th>
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Initiator
                </th>
                <th className="h-12 px-4 text-left align-middle text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-4 text-center text-muted-foreground"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No intents found.
                  </td>
                </tr>
              ) : (
                data.map((intent) => {
                  const reward = formatTokenAmount(
                    intent.rewardAmount,
                    intent.rewardToken,
                  );
                  const minOut = formatTokenAmount(
                    intent.minAmountOut,
                    intent.tokenOut,
                  );
                  return (
                    <tr
                      key={intent.id}
                      className="data-row border-b transition-colors data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle font-mono">
                        {formatAddress(intent.id)}
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            intent.state === "OPEN"
                              ? "border-transparent bg-primary text-primary-foreground"
                              : "text-foreground",
                          )}
                        >
                          {intent.state}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="font-medium">{reward.primary}</div>
                        <div className="text-xs text-muted-foreground">
                          {reward.secondary}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="font-medium">{minOut.primary}</div>
                        <div className="text-xs text-muted-foreground">
                          {minOut.secondary}
                        </div>
                      </td>
                      <td className="p-4 align-middle font-mono text-xs">
                        <a
                          href={explorerAddressUrl(intent.initiator)}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {formatAddress(intent.initiator)}
                        </a>
                      </td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm" disabled>
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
