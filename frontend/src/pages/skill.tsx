import { useEffect, useState } from "react";

export default function SkillPage() {
  const [content, setContent] = useState<string>("Loading SKILL.md...");

  useEffect(() => {
    let alive = true;
    fetch("/skill.md")
      .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
      .then((text) => {
        if (alive) setContent(text);
      })
      .catch(() => {
        if (alive) {
          setContent(
            "SKILL.md is unavailable here. Open the raw file at /skill.md.",
          );
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="page">
      <div className="cli-block skill-block">
        <p className="cli-title">SKILL.md</p>
        <pre className="skill-pre">{content}</pre>
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
