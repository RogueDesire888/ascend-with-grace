import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGoal, getRecipe, getIngredientName } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/goals/$goalId")({
  head: ({ params }) => {
    const g = getGoal(params.goalId);
    return {
      meta: [
        { title: `${g?.name ?? "Goal"} — The Smoothie Codex | Ascend` },
        { name: "description", content: g?.summary ?? "Smoothie protocol." },
      ],
    };
  },
  loader: ({ params }) => {
    const g = getGoal(params.goalId);
    if (!g) throw notFound();
    return { goal: g };
  },
  notFoundComponent: () => (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold">Goal not found</h1>
      <Link to="/smoothie/goals" className="mt-3 inline-block text-primary underline">
        Back to goals
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-3xl border border-destructive/40 bg-card/40 p-6">
      <p>{error.message}</p>
    </div>
  ),
  component: GoalDetail,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function GoalDetail() {
  const { goalId } = Route.useParams();
  const g = getGoal(goalId)!;

  return (
    <article className="space-y-8">
      <Link to="/smoothie/goals" className="text-xs text-primary underline">
        ← All goals
      </Link>

      <header className="rounded-3xl border border-border/50 bg-card/50 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Goal</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">{g.name}</h1>
        <p className="mt-3 text-muted-foreground">{g.summary}</p>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{g.why}</p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Key ingredient stack
        </p>
        <div className="flex flex-wrap gap-2">
          {g.keyIngredients.map((s) => (
            <Link
              key={s}
              to="/smoothie/ingredients/$slug"
              params={{ slug: s }}
              className="rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs hover:bg-secondary"
            >
              {getIngredientName(s)}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Recipes for this goal
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {g.recipes.map((slug) => {
            const r = getRecipe(slug);
            if (!r) return null;
            return (
              <Link
                key={slug}
                to="/smoothie/recipes/$slug"
                params={{ slug }}
                className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:bg-card/60"
              >
                <p className="text-2xl">{r.emoji}</p>
                <p className="mt-1 font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.tagline}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          7-day rotation
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
          {g.rotation.map((slug, idx) => {
            const r = getRecipe(slug);
            return (
              <Link
                key={idx}
                to="/smoothie/recipes/$slug"
                params={{ slug }}
                className="rounded-2xl border border-border/50 bg-card/40 p-3 text-center hover:bg-card/60"
              >
                <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                  {days[idx] ?? `Day ${idx + 1}`}
                </p>
                <p className="mt-1 text-2xl">{r?.emoji}</p>
                <p className="mt-1 text-xs font-semibold text-foreground">{r?.name}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}
