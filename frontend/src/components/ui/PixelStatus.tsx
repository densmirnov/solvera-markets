import React from "react";
import { cn } from "../../lib/utils";

export type PixelTone = "ok" | "warn" | "err" | "idle" | "info";

export function toneForIntentState(state: string): PixelTone {
  const normalized = state.trim().toUpperCase();
  if (normalized === "OPEN") return "ok";
  if (normalized === "SETTLED" || normalized === "VERIFIED") return "ok";
  if (normalized === "CANCELLED" || normalized === "CANCELED") return "err";
  if (normalized === "FAILED" || normalized === "REJECTED") return "err";
  if (normalized === "PENDING" || normalized === "IN_PROGRESS") return "warn";
  return "idle";
}

type PixelStatusChipProps = {
  k?: string;
  v: string;
  tone?: PixelTone;
  className?: string;
  title?: string;
};

export function PixelStatusChip({
  k,
  v,
  tone = "idle",
  className,
  title,
}: PixelStatusChipProps) {
  return (
    <span
      className={cn("hud-chip font-pixel text-[10px]", className)}
      data-tone={tone}
      title={title ?? (k ? `${k} ${v}` : v)}
    >
      {k ? <span className="hud-chip__key">{k}</span> : null}
      <span>{v}</span>
    </span>
  );
}

