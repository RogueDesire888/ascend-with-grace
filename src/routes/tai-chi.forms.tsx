import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { forms, postures, styles as styleEntries, type FamilyStyle, type Level } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/forms")({
  head: () => ({
    meta: [
      { title: "Form Library — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Searchable library of Tai Chi forms and individual postures across every major lineage — Chen, Yang, Wu, Wu-Hao, Sun, and Wudang.",
      },
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
    <article className="space-y-12">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Library</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Form Library</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          {forms.length} canonical forms and {postures.length} individual postures across every
          major Tai Chi lineage. Each form is a different door into the same room.
        </p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">How a form is built</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          A Tai Chi form is a sequenced choreography of postures, but it is not arbitrary. Every
          authentic form is built around the <strong className="text-foreground">13 postures</strong>{" "}
          (8 energies + 5 steps), woven into a sequence that:
        </p>
        <ul className="mt-3 space-y-1 text-sm text-foreground">
          <li>• Opens the body before loading it (warm-up architecture)</li>
          <li>• Cycles each of the 4 cardinal energies (peng, lu, ji, an) multiple times</li>
          <li>• Alternates yin (yielding) and yang (issuing) phases</li>
          <li>• Returns the body to a neutral closing — never ends in a loaded posture</li>
        </ul>
        <p className="mt-3 max-w-prose text-muted-foreground">
          A short form (24 postures, 5–7 min) and a long form (108 postures, 25–30 min) train
          the same principles at different doses. Choose by time, not by ambition.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Choosing your first form</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              who: "I want the most-taught, most-supported entry",
              form: { slug: "yang-24", label: "Yang 24" },
              why: "Standardized, short, taught everywhere on Earth.",
            },
            {
              who: "I want the martial side visible",
              form: { slug: "chen-laojia-yi-lu", label: "Chen Laojia Yi Lu" },
              why: "Slow flow with sudden fa jin. Spirals are explicit.",
            },
            {
              who: "I am older, balance is the priority",
              form: { slug: "sun-73-competition", label: "Sun 73" },
              why: "High stances, no kicks, agile stepping. Sun style was created by a master in his 60s.",
            },
            {
              who: "I have 25 minutes a day and want depth",
              form: { slug: "yang-108", label: "Yang 108 (long form)" },
              why: "The classical Yang form. Endless to refine.",
            },
            {
              who: "I want a competitive standardized form",
              form: { slug: "yang-40-competition", label: "Yang 40 Competition" },
              why: "Created in 1989 for international standardization.",
            },
            {
              who: "I want the smallest, most internal frame",
              form: { slug: "wu-hao-36", label: "Wu (Hao) 36" },
              why: "Compact, almost invisible. Highest internal-to-external ratio.",
            },
          ].map((c) => (
            <article
              key={c.who}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <p className="text-xs italic text-muted-foreground">"{c.who}"</p>
              <p className="mt-2 text-sm font-semibold text-foreground">→ {c.form.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Family styles at a glance</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {styleEntries.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-xs uppercase tracking-widest text-orchid-glow">{s.era}</p>
              <p className="mt-1 font-bold text-foreground">{s.id} Style</p>
              <p className="mt-1 text-xs italic text-muted-foreground">{s.founder}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Best for: {s.bestFor.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Browse the library</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as typeof level)}
            className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-foreground">Forms ({filteredForms.length})</h3>
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
        <h3 className="text-xl font-bold text-foreground">Postures ({filteredPostures.length})</h3>
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
              <p className="text-sm italic text-muted-foreground">
                {p.pinyin} · {p.chinese}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
