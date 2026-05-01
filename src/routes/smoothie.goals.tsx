import { createFileRoute, Link } from "@tanstack/react-router";
import { goals, getIngredientName } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/goals")({
  head: () => ({
    meta: [
      { title: "Smoothies by Goal — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "Energy, gut, recovery, immunity, sleep, focus, hormonal — protocols for each goal.",
      },
    ],
  }),
  component: GoalsIndex,
});

function GoalsIndex() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Smoothies by Goal</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Each goal has a why (the physiology), a key ingredient stack, recipes that target it, and
          a 7-day rotation you can follow without thinking.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => (
          <Link
            key={g.id}
            to="/smoothie/goals/$goalId"
            params={{ goalId: g.id }}
            className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:bg-card/60"
          >
            <p className="font-semibold text-foreground">{g.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{g.summary}</p>
            <p className="mt-3 text-xs">
              <span className="font-semibold text-primary">Key:</span>{" "}
              <span className="text-muted-foreground">
                {g.keyIngredients.slice(0, 5).map(getIngredientName).join(", ")}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
