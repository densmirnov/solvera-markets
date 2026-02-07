import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGet } from "../lib/api";
import {
  explorerAddressUrl,
  formatAddress,
  formatTokenAmount,
} from "../lib/format";
import { useEnsNames } from "../lib/ens";
import { H1, P } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { PixelStatusChip, toneForIntentState } from "../components/ui/PixelStatus";
import { MarketplaceHudRail } from "../components/marketplace/MarketplaceHudRail";

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
  const navigate = useNavigate();
  const [data, setData] = useState<Intent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
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
        setUpdatedAt(Date.now());
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

  const initiatorAddresses = useMemo(
    () => data.map((intent) => intent.initiator),
    [data],
  );
  const ensNames = useEnsNames(initiatorAddresses);

  return (
    <div className="section-stack animate-in fade-in duration-500 marketplace-dense">
      <div className="section-stack-tight reveal delay-1">
        <H1 className="hero-title hero-glint">Marketplace</H1>
        <P className="hero-copy text-muted-foreground max-w-2xl">
          Discover and bid on active intents.
        </P>
      </div>

      <div className="reveal delay-2">
        <MarketplaceHudRail intents={data} updatedAt={updatedAt} />
      </div>

      <div className="pixel-frame card-spotlight surface-soft-muted marketplace-outline flex flex-wrap gap-4 items-end p-4 reveal delay-2 marketplace-filters">
        <div className="grid gap-2">
          <label className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            State
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[190px]"
            placeholder="e.g. OPEN"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          />
        </div>
        {/* More filters can be added here */}
        <Button onClick={load} variant="secondary" size="sm">
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="pixel-frame table-frame surface-soft-muted marketplace-outline overflow-hidden reveal delay-3 marketplace-table-frame">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm marketplace-table">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  ID
                </th>
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  State
                </th>
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Reward
                </th>
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Min Output
                </th>
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Initiator
                </th>
                <th className="h-10 px-3 text-left align-middle text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
                  const detailsHref = `/marketplace/${intent.id}`;
                  const initiatorKey = intent.initiator.toLowerCase();
                  const initiatorEns = ensNames[initiatorKey];
                  const openDetails = () => {
                    navigate(detailsHref);
                  };
                  return (
                    <tr
                      key={intent.id}
                      className="data-row border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/40 cursor-pointer"
                      role="link"
                      tabIndex={0}
                      onClick={openDetails}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openDetails();
                        }
                      }}
                    >
                      <td className="px-3 py-2 align-middle font-mono text-[13px]">
                        <Link
                          to={detailsHref}
                          className="hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {formatAddress(intent.id)}
                        </Link>
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <PixelStatusChip
                          v={intent.state}
                          tone={toneForIntentState(intent.state)}
                          className={cn(
                            "text-[10px]",
                            intent.state === "OPEN"
                              ? "shadow-[0_0_0_1px_hsla(var(--hud-lime),0.12)]"
                              : null,
                          )}
                        />
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <div className="font-medium text-[13px]">
                          {reward.primary}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {reward.secondary}
                        </div>
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <div className="font-medium text-[13px]">
                          {minOut.primary}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {minOut.secondary}
                        </div>
                      </td>
                      <td className="px-3 py-2 align-middle font-mono text-[11px]">
                        <a
                          href={explorerAddressUrl(intent.initiator)}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {initiatorEns ? (
                            <span className="flex flex-col">
                              <span>{initiatorEns}</span>
                              <span className="text-[10px] text-muted-foreground">
                                {formatAddress(intent.initiator)}
                              </span>
                            </span>
                          ) : (
                            formatAddress(intent.initiator)
                          )}
                        </a>
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDetails();
                          }}
                        >
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
