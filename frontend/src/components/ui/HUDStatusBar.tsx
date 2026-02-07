import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../../lib/api";
import { PixelStatusChip } from "./PixelStatus";

type ApiHealth = "checking" | "online" | "offline";

function toneForApi(health: ApiHealth) {
  if (health === "online") return "ok";
  if (health === "offline") return "err";
  return "warn";
}

function valueForApi(health: ApiHealth) {
  if (health === "online") return "ONLINE";
  if (health === "offline") return "OFFLINE";
  return "SYNC";
}

export function HUDStatusBar() {
  const [api, setApi] = useState<ApiHealth>("checking");
  const [netOnline, setNetOnline] = useState<boolean>(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const onOnline = () => setNetOnline(true);
    const onOffline = () => setNetOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const check = () => {
      setApi("checking");
      apiGet("/health")
        .then(() => {
          if (!active) return;
          setApi("online");
        })
        .catch(() => {
          if (!active) return;
          setApi("offline");
        });
    };

    check();
    window.addEventListener("focus", check);
    const interval = window.setInterval(check, 30_000);
    return () => {
      active = false;
      window.removeEventListener("focus", check);
      window.clearInterval(interval);
    };
  }, []);

  const netTone = useMemo(() => (netOnline ? "ok" : "err"), [netOnline]);
  const netValue = useMemo(() => (netOnline ? "ONLINE" : "OFFLINE"), [netOnline]);

  return (
    <div className="hud-strip">
      <PixelStatusChip k="NET" v={netValue} tone={netTone} />
      <PixelStatusChip k="API" v={valueForApi(api)} tone={toneForApi(api)} />
    </div>
  );
}

