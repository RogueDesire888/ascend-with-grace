import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { allStudies } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/science")({
  head: () => ({
    meta: [
      { title: "Health Science — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Tai Chi is one of the most-studied movement practices in modern medicine. The physiology, the mechanisms, and a searchable library of peer-reviewed evidence.",
      },
    ],
  }),
  component: SciencePage,
});

const categories = ["all", ...Array.from(new Set(allStudies.map((s) => s.category)))] as const;

function SciencePage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("all");
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"year" | "title">("year");

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let out = allStudies.filter((s) => cat === "all" || s.category === cat);
    if (ql)
      out = out.filter(
        (s) =>
          s.title.toLowerCase().includes(ql) ||
          s.outcome.toLowerCase().includes(ql) ||
          s.authors.toLowerCase().includes(ql),
      );
    out = [...out].sort((a, b) =>
      sortBy === "year" ? b.year - a.year : a.title.localeCompare(b.title),
    );
    return out;
  }, [cat, q, sortBy]);

  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Evidence</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Health Science</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi is one of the most-studied movement practices in modern medicine.{" "}
          {allStudies.length} peer-reviewed studies summarized below — including landmark{" "}
          <em>NEJM</em> trials on Parkinson's, fibromyalgia, and knee osteoarthritis.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { n: "55%", label: "fall reduction (Wolf 1996)" },
          { n: "−7 mmHg", label: "systolic BP (meta-analysis)" },
          { n: "↑ HRV", label: "after 8 weeks of practice" },
          { n: "MCI ↓", label: "memory + executive function" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/50 bg-card/40 p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{s.n}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Anatomy & gas exchange</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Tai Chi's signature breath — slow, nasal, ≈6 cycles per minute — sits exactly at the
          cardiovascular resonance frequency where baroreflex gain peaks and HRV is maximized.
          The diaphragm engages on every breath; the slow exhale activates the parasympathetic
          dorsal vagal complex; alveolar gas exchange becomes maximally efficient. None of
          this is incidental — the classical breath instructions select for it.
        </p>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">
          Movement & the autonomic nervous system
        </h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-background/40 p-4">
            <p className="font-semibold text-foreground">Sympathetic load (light)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sustained low-grade weight transfer, eccentric quadriceps contractions, and
              single-leg postures generate just enough sympathetic activation to challenge
              the cardiovascular and balance systems without exceeding their capacity.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-background/40 p-4">
            <p className="font-semibold text-foreground">Parasympathetic dominance</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Slow nasal breath, long exhale, soft gaze, and meditative attention drive the
              session toward parasympathetic dominance. Cortisol drops, HRV rises, and
              inflammatory gene expression measurably reverses (Irwin 2014).
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Biomechanics of safety</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Why does Tai Chi rehabilitate knees that other exercise programs aggravate? Three
          properties of the form:
        </p>
        <ul className="mt-3 space-y-1 text-sm text-foreground">
          <li>
            • <strong>Knee always tracks over the second toe.</strong> Torque originates above
            (kua) and below (foot) — never in the joint itself.
          </li>
          <li>
            • <strong>Eccentric loading is slow.</strong> 3–8 second sit-downs build tendon
            resilience without impact.
          </li>
          <li>
            • <strong>Breath drives intensity.</strong> If the breath shortens, the
            practitioner self-regulates back to a sustainable pace.
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          The Wang 2016 RCT (<em>Annals of Internal Medicine</em>) found Tai Chi equivalent to
          standard physical therapy for knee OA pain and function — and superior on depression
          and quality of life.
        </p>
        <p className="mt-3 text-sm">
          <Link to="/tai-chi/anatomy" className="text-orchid-glow underline">
            → Full anatomy &amp; biomechanics
          </Link>
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Research Library</h2>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-xs ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/60 bg-card/40 text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
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
            <option value="year">Sort: newest</option>
            <option value="title">Sort: A–Z</option>
          </select>
        </div>

        <ul className="space-y-3">
          {list.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {s.category} · {s.year}
              </p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {s.authors} · {s.journal}
              </p>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Design: </span>
                  {s.design}
                </p>
                <p>
                  <span className="text-muted-foreground">Population: </span>
                  {s.population}
                </p>
              </div>
              <p className="mt-2 text-sm">
                <span className="text-muted-foreground">Intervention: </span>
                {s.intervention}
              </p>
              <p className="mt-2 text-sm text-foreground">
                <span className="text-orchid-glow">Outcome: </span>
                {s.outcome}
              </p>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="text-sm italic text-muted-foreground">No matches.</p>
        )}
      </section>
    </article>
  );
}
