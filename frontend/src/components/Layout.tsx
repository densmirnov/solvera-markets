import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/docs", label: "Docs" },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bauhaus-shell flex min-h-screen flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="layout-shell-wide flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <NavLink to="/" className="mr-6 flex items-center space-x-2">
              <span className="brand-mark hidden font-bold sm:inline-block">
                Solvera
              </span>
            </NavLink>
            <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
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
              ))}
            </nav>
          </div>
          {/* Mobile menu could go here */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Search or other controls could go here */}
            </div>
            <nav className="flex items-center">
              {/* Additional nav items like GitHub link or Role toggle */}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
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
