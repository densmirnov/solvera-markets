import { Button } from "./Button";
import { cn } from "../../lib/utils";
import { getNetworkDefinition, type SupportedNetwork } from "../../lib/networks";
import { useNetworkSelection } from "../../lib/network-context";

function walletTone(status: string): string {
  if (status === "ready") return "text-[hsl(var(--hud-lime))]";
  if (status === "unavailable" || status === "error") {
    return "text-destructive";
  }
  return "text-muted-foreground";
}

export function NetworkSwitcher() {
  const { selectedNetwork, selectNetwork, walletSyncState, walletMessage } =
    useNetworkSelection();

  const renderButton = (network: SupportedNetwork) => {
    const definition = getNetworkDefinition(network);
    const active = selectedNetwork === network;

    return (
      <Button
        key={network}
        type="button"
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "min-w-[94px] rounded-none border-l border-border/30 first:border-l-0",
          active ? "text-foreground" : "text-foreground/70",
        )}
        onClick={() => void selectNetwork(network)}
      >
        {definition.label}
      </Button>
    );
  };

  return (
    <div className="pixel-frame surface-soft-muted marketplace-outline flex items-center overflow-hidden">
      <div className="flex items-center">{(["base", "status-sepolia"] as const).map(renderButton)}</div>
      <div className="border-l border-border/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]">
        <span className={walletTone(walletSyncState)}>
          {walletSyncState === "switching" && "Wallet sync"}
          {walletSyncState === "ready" && "Wallet ready"}
          {walletSyncState === "unavailable" && "No wallet"}
          {walletSyncState === "error" && "Wallet error"}
          {walletSyncState === "idle" && "Wallet idle"}
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
