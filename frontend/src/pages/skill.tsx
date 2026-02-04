import skillMarkdown from "../../SKILL.md?raw";

export default function SkillPage() {
  return (
    <section className="page">
      <section className="skill-section">
        <header className="skill-header">
          <h2 className="landing-section-title">SKILL.md</h2>
          <p className="skill-meta">
            Direct link:{" "}
            <a className="text-link" href="/skill.md">
              /skill.md
            </a>
          </p>
        </header>
        <div className="skill-text">{skillMarkdown}</div>
      </section>
    </section>
  );
}
