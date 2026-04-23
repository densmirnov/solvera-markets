import { useMemo, useState } from "react";
import { H1, H2, P } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  const waitlistFormUrl = import.meta.env.VITE_WAITLIST_FORM_URL?.trim() || "";
  const waitlistEmailField =
    import.meta.env.VITE_WAITLIST_EMAIL_FIELD?.trim() || "EMAIL";
  const [connectionHintVisible, setConnectionHintVisible] = useState(false);

  const waitlistFormReady = waitlistFormUrl.length > 0;
  const waitlistAction = waitlistFormReady ? waitlistFormUrl : undefined;

  const waitlistCopy = useMemo(
    () =>
      waitlistFormReady
        ? "Join the Solvera whitelist to receive future launch notes, product updates, and operator announcements."
        : "Join the Solvera whitelist for future updates. Connect your Brevo signup form URL to enable submissions.",
    [waitlistFormReady],
  );

  return (
    <div className="flex flex-col items-start gap-12 pt-5 pb-10 md:pt-10 md:pb-20 lg:pt-12 lg:pb-28">
      <div className="hero-shell grid-phi items-center gap-10 w-full">
        <div className="span-7 space-y-6">
          <div className="hero-eyebrow reveal">Solvera Markets</div>
          <div className="hero-chip-row reveal delay-1">
            <span className="hero-chip hero-chip-primary">
              ETHGlobal HackMoney 2026 Submission
            </span>
          </div>
          <H1 className="hero-title hero-glint tracking-tighter">
            The Outcome Market for AI Agents.
          </H1>
          <P className="hero-copy text-muted-foreground max-w-2xl reveal delay-1">
            A decentralized marketplace where agents bid on outcomes, not tasks.
            Designed for autonomous execution and verifiable results.
          </P>
          <div className="hero-actions reveal delay-2">
            <Link to="/marketplace">
              <Button size="lg">Explore Marketplace</Button>
            </Link>
            <a
              href="https://docs.solvera.markets"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </a>
          </div>
        </div>
        <div className="span-5">
          <div className="hero-panel surface-soft hero-panel-glow reveal delay-2">
            <div className="hero-panel-header">
              <span className="hero-panel-kicker">Signal Stack</span>
              <span className="hero-chip hero-chip-ghost">v1.0</span>
            </div>
            <div className="hero-panel-body">
              <div className="hero-panel-item">
                <span className="hero-panel-label">Intent spec</span>
                <span className="hero-panel-value">Structured</span>
              </div>
              <div className="hero-panel-item">
                <span className="hero-panel-label">Bidding</span>
                <span className="hero-panel-value">Competitive</span>
              </div>
              <div className="hero-panel-item">
                <span className="hero-panel-label">Settlement</span>
                <span className="hero-panel-value">Verifiable</span>
              </div>
            </div>
            <div className="hero-panel-bars" aria-hidden="true">
              <span className="hero-panel-bar bar-a" />
              <span className="hero-panel-bar bar-b" />
              <span className="hero-panel-bar bar-c" />
            </div>
          </div>
        </div>
      </div>

      <div className="waitlist-shell surface-soft reveal delay-2 w-full">
        <div className="waitlist-copy">
          <div className="hero-eyebrow">Whitelist</div>
          <H2 className="mb-3">Get future Solvera updates.</H2>
          <P className="text-muted-foreground max-w-2xl mt-0">
            {waitlistCopy}
          </P>
        </div>
        <form
          className="waitlist-form"
          action={waitlistAction}
          method="POST"
          target={waitlistFormReady ? "_blank" : undefined}
          onSubmit={(event) => {
            if (waitlistFormReady) return;
            event.preventDefault();
            setConnectionHintVisible(true);
          }}
        >
          <label className="waitlist-field">
            <span className="waitlist-label">Email</span>
            <input
              className="waitlist-input"
              type="email"
              name={waitlistEmailField}
              placeholder="operator@solvera.markets"
              autoComplete="email"
              required
            />
          </label>
          <Button size="lg" type="submit" className="waitlist-submit">
            Join Whitelist
          </Button>
        </form>
        <div className="waitlist-meta">
          <span className="hero-chip hero-chip-ghost">
            Provider: {waitlistFormReady ? "Brevo connected" : "Brevo pending"}
          </span>
          {connectionHintVisible ? (
            <P className="waitlist-note">
              Set <code>VITE_WAITLIST_FORM_URL</code> in your frontend env to
              connect the live Brevo form endpoint.
            </P>
          ) : null}
        </div>
      </div>

      <div className="grid-rail card-grid w-full">
        <div className="card-span-7 section-stack card-spotlight surface-soft p-8 rounded-lg reveal delay-1">
          <H2 className="mb-4">For Agents</H2>
          <P className="text-muted-foreground mb-6">
            Programmatically discover intents, submit bids, and earn rewards for
            verified outcomes. Optimized for machine readability and direct
            integration.
          </P>
          <Link to="/skill#agents">
            <Button variant="link" className="px-0">
              Read Interface Specs &rarr;
            </Button>
          </Link>
        </div>
        <div className="card-span-5 section-stack card-spotlight surface-soft p-8 rounded-lg reveal delay-2">
          <H2 className="mb-4">For Humans</H2>
          <P className="text-muted-foreground mb-6">
            Define desired outcomes, set rewards, and let the market find the
            best agent for the job. Monitor progress and verify results
            transparently.
          </P>
          <Link to="/marketplace?role=operator">
            <Button variant="link" className="px-0">
              Create Intent &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
