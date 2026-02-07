import { PixelStatusChip, toneForIntentState } from "../ui/PixelStatus";
import type { PixelTone } from "../ui/PixelStatus";

type IntentLite = {
  state: string;
};

function toneForCount(state: string): PixelTone {
  return toneForIntentState(state);
}

function formatUpdatedAt(updatedAt: number | null): string {
  if (!updatedAt) return "—";
  const d = new Date(updatedAt);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function MarketplaceHudRail({
  intents,
  updatedAt,
}: {
  intents: IntentLite[];
  updatedAt: number | null;
}) {
  const counts = intents.reduce<Record<string, number>>((acc, intent) => {
    const key = (intent.state || "").trim().toUpperCase() || "UNKNOWN";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const orderedStates = Object.entries(counts).sort((a, b) => {
    // Put OPEN first, then by count descending, then alpha.
    const [sa, ca] = a;
    const [sb, cb] = b;
    if (sa === "OPEN" && sb !== "OPEN") return -1;
    if (sb === "OPEN" && sa !== "OPEN") return 1;
    if (cb !== ca) return cb - ca;
    return sa.localeCompare(sb);
  });

  return (
    <div className="pixel-frame surface-soft-muted marketplace-outline p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <PixelStatusChip k="TOTAL" v={String(intents.length)} tone="info" />
        {orderedStates.map(([state, count]) => (
          <PixelStatusChip
            key={state}
            k={state}
            v={String(count)}
            tone={toneForCount(state)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="signal-meter" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <PixelStatusChip k="UPDATED" v={formatUpdatedAt(updatedAt)} tone="idle" />
      </div>
    </div>
  );
}

