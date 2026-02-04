export function formatAddress(value: string | null | undefined): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function formatAmount(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  const asString = typeof value === "number" ? value.toString() : value;
  if (asString.length <= 10) return asString;
  return `${asString.slice(0, 10)}…`;
}
