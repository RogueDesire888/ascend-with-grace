import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { studies } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/science")({
  head: () => ({
    meta: [
      { title: "Health Science — Tai Chi | Ascend" },
      { name: "description", content: "Curated peer-reviewed research on Tai Chi: balance, knee OA, blood pressure, cognition, immunity, and more." },
    ],
  }),
  component: SciencePage,
});

const categories = ["all", ...Array.from(new Set(studies.map((s) => s.category)))] as const;

function SciencePage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("all");
  const list = cat === "all" ? studies : studies.filter((s) => s.category === cat);

  return (
    <article className="space-y-8">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Evidence</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Health Science</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          {studies.length} peer-reviewed studies summarized — including landmark NEJM trials on Parkinson's,
          fibromyalgia, and knee osteoarthritis.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-xs ${
              cat === c ? "bg-primary text-primary-foreground" : "border border-border/60 bg-card/40 text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {list.map((s) => (
          <article key={s.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
            <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">{s.category} · {s.year}</p>
            <h3 className="mt-1 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.authors} · {s.journal}</p>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <p><span className="text-muted-foreground">Design: </span>{s.design}</p>
              <p><span className="text-muted-foreground">Population: </span>{s.population}</p>
            </div>
            <p className="mt-2 text-sm"><span className="text-muted-foreground">Intervention: </span>{s.intervention}</p>
            <p className="mt-2 text-sm text-foreground"><span className="text-orchid-glow">Outcome: </span>{s.outcome}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
