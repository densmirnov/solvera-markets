import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { HUDStatusBar } from "./ui/HUDStatusBar";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/skill", label: "Skill" },
  { to: "https://docs.solvera.markets", label: "Docs", external: true },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="bauhaus-shell flex min-h-screen flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="layout-shell-wide flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <NavLink to="/" className="mr-6 flex items-center space-x-2">
              <span className="brand-mark hidden font-bold sm:inline-block">
                Solvera
              </span>
            </NavLink>
            <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.to}
                    href={link.to}
                    className="nav-link transition-colors hover:text-foreground/80 text-foreground/60"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "nav-link transition-colors hover:text-foreground/80",
                        isActive
                          ? "nav-link-active text-foreground font-medium"
                          : "text-foreground/60",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between gap-3 md:justify-end">
            <NavLink to="/" className="md:hidden flex items-center">
              <span className="brand-mark font-bold">Solvera</span>
            </NavLink>
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Search or other controls could go here */}
            </div>
            <nav className="flex items-center">
              <HUDStatusBar />
            </nav>
          </div>
        </div>
      </header>

      <main
        className={cn(
          "flex-1 pb-6 md:pb-10",
          isHome ? "pt-3 md:pt-5 lg:pt-7" : "pt-6 md:pt-10",
        )}
      >
        <div className="layout-shell-wide">{children}</div>
      </main>

      <footer className="py-8 md:py-0">
        <div className="layout-shell-wide flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/densmirnov/solvera-markets"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Solvera
            </a>
            . The outcome market for AI agents.
          </p>
        </div>
      </footer>
    </div>
  );
}
