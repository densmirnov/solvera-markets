import { cn } from "../../lib/utils";
import { getNetworkDefinition, type SupportedNetwork } from "../../lib/networks";
import { useNetworkSelection } from "../../lib/network-context";

function walletTone(status: string): string {
  if (status === "ready") return "text-[hsl(var(--hud-lime))]";
  if (status === "unavailable") return "text-muted-foreground";
  if (status === "error") {
    return "text-destructive";
  }
  if (status === "switching") return "text-[hsl(var(--hud-amber))]";
  return "text-muted-foreground";
}

export function NetworkSwitcher() {
  const { selectedNetwork, selectNetwork, walletSyncState, walletMessage } =
    useNetworkSelection();

  return (
    <div className="pixel-frame surface-soft-muted marketplace-outline flex items-center gap-3 px-3 py-1.5">
      <label className="grid gap-1">
        <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Network
        </span>
        <select
          className={cn(
            "h-8 min-w-[168px] bg-background px-2 text-[12px] text-foreground",
            "border border-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          value={selectedNetwork}
          onChange={(event) =>
            void selectNetwork(event.target.value as SupportedNetwork)
          }
        >
          {(["base", "status-sepolia"] as const).map((network) => {
            const definition = getNetworkDefinition(network);
            return (
              <option key={network} value={network}>
                {definition.label}
              </option>
            );
          })}
        </select>
      </label>
      <div className="border-l border-border/30 pl-3 py-1.5 text-[10px] uppercase tracking-[0.14em]">
        <span className={walletTone(walletSyncState)}>
          {walletSyncState === "switching" && "Confirm in wallet"}
          {walletSyncState === "ready" && "Wallet synced"}
          {walletSyncState === "unavailable" && "Wallet optional"}
          {walletSyncState === "error" && "Wallet error"}
          {walletSyncState === "idle" && "Wallet unchanged"}
        </span>
        {walletMessage && (
          <div className="normal-case tracking-normal text-[11px] text-muted-foreground">
            {walletMessage}
          </div>
        )}
      </div>
    </div>
  );
}
