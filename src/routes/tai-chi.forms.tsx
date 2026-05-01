import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { forms, postures, type FamilyStyle, type Level } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/forms")({
  head: () => ({
    meta: [
      { title: "Form Library — Tai Chi | Ascend" },
      { name: "description", content: "Searchable library of Tai Chi forms and individual postures across all major lineages." },
    ],
  }),
  component: FormsPage,
});

const styles: (FamilyStyle | "All")[] = ["All", "Chen", "Yang", "Wu", "Wu-Hao", "Sun", "Wudang", "Modern"];
const levels: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

function FormsPage() {
  const [style, setStyle] = useState<(typeof styles)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [q, setQ] = useState("");

  const filteredForms = forms.filter(
    (f) =>
      (style === "All" || f.style === style) &&
      (level === "All" || f.level === level) &&
      (q === "" || f.name.toLowerCase().includes(q.toLowerCase())),
  );
  const filteredPostures = postures.filter(
    (p) =>
      (style === "All" || p.styles.includes(style as FamilyStyle)) &&
      (level === "All" || p.level === level) &&
      (q === "" ||
        p.english.toLowerCase().includes(q.toLowerCase()) ||
        p.pinyin.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Library</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Form Library</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Browse {forms.length} canonical forms and {postures.length} individual postures across every major Tai Chi lineage.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <input
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as typeof style)}
          className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        >
          {styles.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as typeof level)}
          className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        >
          {levels.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Forms ({filteredForms.length})</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filteredForms.map((f) => (
            <Link
              key={f.slug}
              to="/tai-chi/forms/$slug"
              params={{ slug: f.slug }}
              className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/60"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {f.style} · {f.level} · {f.durationMinutes} min
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">{f.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.postureCount} postures</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{f.why}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Postures ({filteredPostures.length})</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredPostures.map((p) => (
            <Link
              key={p.slug}
              to="/tai-chi/postures/$slug"
              params={{ slug: p.slug }}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/60"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {p.family} · {p.level}
              </p>
              <p className="mt-1 font-semibold text-foreground">{p.english}</p>
              <p className="text-sm italic text-muted-foreground">{p.pinyin} · {p.chinese}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
