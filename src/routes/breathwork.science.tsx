import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { studies } from "@/lib/breathwork-data";

export const Route = createFileRoute("/breathwork/science")({
  head: () => ({
    meta: [
      { title: "Science of Breath — Breathwork | Ascend" },
      { name: "description", content: "The physiology, biochemistry, and research behind breathwork." },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"year" | "title">("year");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let list = studies.filter(
      (s) =>
        !ql ||
        s.title.toLowerCase().includes(ql) ||
        s.findings.toLowerCase().includes(ql) ||
        s.authors.toLowerCase().includes(ql) ||
        s.techniques.some((t) => t.includes(ql)),
    );
    list = [...list].sort((a, b) =>
      sortBy === "year" ? b.year - a.year : a.title.localeCompare(b.title),
    );
    return list;
  }, [q, sortBy]);

  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Science of Breath</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Anatomy, gas exchange, autonomic regulation, and a living research library.
        </p>
      </header>

      <section className="quest-panel-air rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Anatomy & Gas Exchange</h2>
        <p className="mt-3 text-muted-foreground">
          Each breath is a pressure trick. The diaphragm contracts and flattens, the ribs lift,
          intrathoracic pressure drops, and air flows in. Inside the alveoli — 480 million tiny sacs
          — oxygen diffuses into the blood while CO₂ diffuses out. Deliberate hyperventilation
          lowers end-tidal CO₂, raises blood pH, and is the physiological key to many
          altered-state breathwork practices.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat n="20,000" label="breaths per day" />
          <Stat n="6 L" label="lung capacity (avg adult)" />
          <Stat n="0.1 Hz" label="resonance frequency" />
        </div>
      </section>

      <section className="quest-panel-air rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Breath & the Nervous System</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-background/40 p-4">
            <p className="font-semibold text-foreground">Sympathetic (gas pedal)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Activated by faster, fuller breathing — kapalabhati, bhastrika, Wim Hof. Raises heart
              rate, alertness, and adrenaline.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/40 p-4">
            <p className="font-semibold text-foreground">Parasympathetic (brake pedal)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Activated by slow nasal breathing with long exhales — coherent, 4-7-8, cyclic sighing.
              Lowers heart rate and engages the vagus nerve.
            </p>
          </div>
        </div>
      </section>

      <section className="quest-panel-air rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-foreground">Biochemistry of Breathwork</h2>
        <p className="mt-3 text-muted-foreground">
          Active breathwork shifts CO₂, blood pH, and hormone profiles. Conscious Connected
          Breathwork has been shown to lower cortisol; Wim Hof breathing raises adrenaline; coherent
          breathing improves baroreflex gain. Each technique is a chemistry experiment your body
          performs in minutes.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Research Library</h2>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search title, author, finding…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "year" | "title")}
            className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            <option value="year">Sort: Newest</option>
            <option value="title">Sort: A–Z</option>
          </select>
        </div>
        <ul className="space-y-3">
          {filtered.map((s) => (
            <li key={s.id} className="rounded-xl border border-border/50 bg-background/40 p-4">
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">
                {s.authors} — {s.journal} ({s.year})
              </p>
              <p className="mt-2 text-sm text-foreground/90">{s.findings}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <a
                  href={`https://doi.org/${s.doi}`}
                  target="_blank"
                  rel="noopener"
                  className="text-cyan-glow underline"
                >
                  doi:{s.doi}
                </a>
                {s.techniques.map((t) => (
                  <span key={t} className="rounded-full border border-border/50 px-2 py-0.5 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4 text-center">
      <p className="text-2xl font-bold text-foreground">{n}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
