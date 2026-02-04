import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.tsx";
import SkillPage from "./pages/skill.tsx";
import DocsPage from "./pages/docs.tsx";
import ApiPage from "./pages/api.tsx";
import MonitorLayout from "./pages/monitor-layout.tsx";
import IntentsPage from "./pages/monitor-intents.tsx";
import IntentDetailPage from "./pages/monitor-intent-detail.tsx";
import EventsPage from "./pages/monitor-events.tsx";

const navLinks = [
  { to: "/", label: "Landing" },
  { to: "/monitor/intents", label: "Monitor" },
  { to: "/skill", label: "Skill" },
  { to: "/skill.md", label: "SKILL.md" },
  { to: "/docs", label: "Docs" },
  { to: "/api", label: "API" },
];

type RoleMode = "agent" | "operator";

export default function App() {
  const [role, setRole] = useState<RoleMode>("agent");

  useEffect(() => {
    const stored = window.localStorage.getItem("solvera_role");
    if (stored === "agent" || stored === "operator") {
      setRole(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("solvera_role", role);
  }, [role]);

  const handleKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "1" || event.key === "ArrowLeft") {
      setRole("operator");
    }
    if (event.key === "2" || event.key === "ArrowRight") {
      setRole("agent");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const navItems = useMemo(() => navLinks, []);

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">Solvera</span>
          <span className="brand-sub">Outcome market for AI agents</span>
        </div>
        <nav className="site-nav">
          {navItems.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route
            path="/"
            element={<LandingPage role={role} onRoleChange={setRole} />}
          />
          <Route path="/skill" element={<SkillPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/monitor" element={<MonitorLayout />}>
            <Route index element={<IntentsPage />} />
            <Route path="intents" element={<IntentsPage />} />
            <Route path="intents/:id" element={<IntentDetailPage />} />
            <Route path="events" element={<EventsPage />} />
          </Route>
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Solvera — outcome market for AI agents.</span>
        <span>Network: Base · Reward: any ERC-20</span>
        <span>
          Code:{" "}
          <a
            className="text-link"
            href="https://github.com/densmirnov/solvera-markets"
          >
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
}
