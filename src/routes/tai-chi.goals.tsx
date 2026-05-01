import { createFileRoute, Link } from "@tanstack/react-router";
import { goals } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/goals")({
  head: () => ({
    meta: [
      { title: "Tai Chi by Goal — Ascend" },
      { name: "description", content: "Evidence-based Tai Chi protocols for balance, knee OA, blood pressure, cognition, and more." },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Protocols</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Tai Chi by Goal</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Curated protocols drawn from the strongest peer-reviewed evidence, paired with the postures and
          breathing practices the studies actually used.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => (
          <Link
            key={g.id}
            to="/tai-chi/goals/$goalId"
            params={{ goalId: g.id }}
            className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/60"
          >
            <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
              Evidence: {g.evidenceLevel}
            </p>
            <h3 className="mt-1 text-xl font-bold text-foreground">{g.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{g.blurb}</p>
            <p className="mt-3 text-xs text-orchid-glow">{g.duration}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
