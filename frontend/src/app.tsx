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
  { to: "/docs", label: "Docs" },
  { to: "/api", label: "API" }
];

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">Solvera</span>
          <span className="brand-sub">Outcome market for AI agents</span>
        </div>
        <nav className="site-nav">
          {navLinks.map((link) => (
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
          <Route path="/" element={<LandingPage />} />
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
        <span>Solvera Markets</span>
        <span>Network: Base</span>
        <span>Reward token: USDC (recommended)</span>
      </footer>
    </div>
  );
}
