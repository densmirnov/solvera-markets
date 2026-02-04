export function formatAddress(value: string | null | undefined): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

const BASESCAN = "https://basescan.org";
const USDC_BASE = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";

export function explorerAddressUrl(value: string | null | undefined): string {
  if (!value) return "";
  return `${BASESCAN}/address/${value}`;
}

export function explorerTxUrl(value: string | null | undefined): string {
  if (!value) return "";
  return `${BASESCAN}/tx/${value}`;
}

function formatUnits(raw: string, decimals: number): string {
  const cleaned = raw.trim();
  if (!cleaned) return "0";
  const negative = cleaned.startsWith("-");
  const digits = negative ? cleaned.slice(1) : cleaned;
  const padded = digits.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals);
  const fraction = padded.slice(-decimals).replace(/0+$/, "");
  const full = fraction ? `${whole}.${fraction}` : whole;
  return negative ? `-${full}` : full;
}

export function formatTokenAmount(
  raw: string | number | null | undefined,
  tokenAddress?: string | null,
): { primary: string; secondary: string } {
  if (raw === null || raw === undefined) {
    return { primary: "-", secondary: "" };
  }
  const rawValue = typeof raw === "number" ? raw.toString() : raw;
  const normalized = tokenAddress ? tokenAddress.toLowerCase() : "";

  if (normalized === USDC_BASE) {
    const human = formatUnits(rawValue, 6);
    return {
      primary: `${human} USDC`,
      secondary: `raw ${rawValue} (6 decimals)`,
    };
  }

  if (tokenAddress) {
    const human = formatUnits(rawValue, 18);
    return {
      primary: `${human} (assumes 18 decimals)`,
      secondary: `raw ${rawValue}`,
    };
  }

  return {
    primary: `raw ${rawValue}`,
    secondary: "decimals unknown",
  };
}
