import { createFileRoute, Link } from "@tanstack/react-router";
import { goals } from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/goals")({
  head: () => ({
    meta: [
      { title: "Yoga by Goal — Ascend" },
      { name: "description", content: "Curated yoga sequences by outcome." },
    ],
  }),
  component: Goals,
});

function Goals() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Yoga by Goal</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Pick what you need. Each hub is a complete protocol — sequence, pranayama, duration, and
          the research that backs it.
        </p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <Link
            key={g.id}
            to="/yoga/goals/$goalId"
            params={{ goalId: g.id }}
            className="quest-panel-air block rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-bold text-foreground">{g.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
            <p className="mt-3 text-xs text-orchid-glow">{g.duration}</p>
          </Link>
        ))}
      </section>
    </article>
  );
}
