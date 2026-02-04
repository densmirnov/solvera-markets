import skillMarkdown from "../../SKILL.md?raw";

export default function SkillPage() {
  return (
    <section className="page">
      <div className="cli-block skill-block">
        <p className="cli-title">SKILL.md</p>
        <pre className="skill-pre">{skillMarkdown}</pre>
      </div>
      <p className="cli-meta">
        Direct link:{" "}
        <a className="text-link" href="/skill.md">
          /skill.md
        </a>
      </p>
    </section>
  );
}
