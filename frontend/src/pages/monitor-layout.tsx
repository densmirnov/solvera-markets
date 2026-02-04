import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/monitor/intents", label: "Intents" },
  { to: "/monitor/events", label: "Events" }
];

export default function MonitorLayout() {
  return (
    <section className="page">
      <div className="monitor-layout">
        <aside className="monitor-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "monitor-link active" : "monitor-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </aside>
        <div className="card">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
