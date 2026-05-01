import { createFileRoute, Link } from "@tanstack/react-router";
import { goals } from "@/lib/breathwork-data";

export const Route = createFileRoute("/breathwork/goals")({
  head: () => ({
    meta: [
      { title: "Breathwork by Goal — Ascend" },
      { name: "description", content: "Find the right breath practice for sleep, focus, stress, energy, performance, or healing." },
    ],
  }),
  component: GoalsHub,
});

function GoalsHub() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Breathwork by Goal</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          What do you want the breath to do for you today?
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <Link
            key={g.id}
            to="/breathwork/goals/$goalId"
            params={{ goalId: g.id }}
            className="quest-panel-air rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-foreground">{g.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-cyan-glow">
              {g.recommended.length} techniques →
            </p>
          </Link>
        ))}
      </div>
    </article>
  );
}
