import { createFileRoute, Link } from "@tanstack/react-router";
import { goals } from "@/lib/herbal-data";

export const Route = createFileRoute("/alchemists-path/goals")({
  head: () => ({
    meta: [
      { title: "Herbs by Goal — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Choose your aim — sleep, calm, immunity, digestion, hormones, energy, skin, heart — and find the herbs and protocols matched to it.",
      },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Herbs by Goal</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Goal-first navigation. Each path opens to a curated cohort of herbs, a multi-week
          protocol, and a foundational recipe.
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => (
          <li key={g.id}>
            <Link
              to="/alchemists-path/goals/$goalId"
              params={{ goalId: g.id }}
              className="block h-full rounded-3xl border border-border/50 bg-card/40 p-6 transition-colors hover:bg-card/60"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-leaf-glow">
                {g.herbs.length} ally herbs
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">{g.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
