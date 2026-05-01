import { createFileRoute, Link } from "@tanstack/react-router";
import { rituals, getRecipe } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/rituals")({
  head: () => ({
    meta: [
      { title: "Rituals — The Smoothie Codex | Ascend" },
      { name: "description", content: "Sunrise, post-workout, break-fast, and evening wind-down rituals." },
    ],
  }),
  component: RitualsPage,
});

function RitualsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Rituals</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A smoothie placed at the right moment in the day does more than the same smoothie at random.
          These are the windows that pay back the practice.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {rituals.map((r) => {
          const recipe = getRecipe(r.recipe);
          return (
            <div key={r.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="font-semibold text-foreground">{r.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary">{r.when}</p>
              <p className="mt-2 text-sm text-muted-foreground">{r.intention}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">{r.notes}</p>
              {recipe && (
                <Link
                  to="/smoothie/recipes/$slug"
                  params={{ slug: recipe.slug }}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  → Pair with {recipe.emoji} {recipe.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
