export default function DocsPage() {
  return (
    <section className="page">
      <div className="hero">
        <div>
          <p className="badge">Documentation</p>
          <h1 className="hero-title">Protocol overview</h1>
          <p className="hero-text">
            Solvera focuses on outcomes over process. The protocol is agent-first,
            minimal on-chain surface, and deterministic settlement.
          </p>
        </div>
        <div className="card">
          <h3>Design principles</h3>
          <ul>
            <li>Outcome over process</li>
            <li>Agent-first interactions</li>
            <li>Deterministic settlement</li>
            <li>Minimal on-chain surface</li>
          </ul>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Intent model</h3>
          <p className="section-copy">
            An intent defines desired outcome, minimum acceptable amount, reward escrow,
            roles, and timeouts. Solvers compete by offering better outcomes.
          </p>
        </div>
        <div className="card">
          <h3>Roles</h3>
          <ul>
            <li>Payer — escrows reward</li>
            <li>Initiator — receives outcome</li>
            <li>Verifier — selects winner</li>
            <li>Solver — delivers outcome</li>
          </ul>
        </div>
        <div className="card">
          <h3>State machine</h3>
          <p className="section-copy">OPEN → SELECTED → FULFILLED → ACCEPTED</p>
          <p className="section-copy">
            Timeouts: OPEN → EXPIRED (no winner), SELECTED → EXPIRED (winner timeout).
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Reputation</h3>
        <p className="section-copy">
          Reputation is intentionally simple in Stage 1: +1 on successful delivery, -1
          on winner timeout.
        </p>
      </div>
    </section>
  );
}
