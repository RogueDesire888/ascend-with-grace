import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getGoal, getHerb } from "@/lib/herbal-data";
import { useHerbalProgress } from "@/lib/herbal-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/alchemists-path/goals/$goalId")({
  loader: ({ params }) => {
    const goal = getGoal(params.goalId);
    if (!goal) throw notFound();
    return { goal };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.goal.name ?? "Goal"} — The Alchemist's Path | Ascend` },
      {
        name: "description",
        content: loaderData?.goal.summary ?? "Herbal protocol",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold text-foreground">Goal not found</h1>
      <Link to="/alchemists-path/goals" className="mt-2 inline-block text-leaf-glow underline">
        Back to goals
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-3xl border border-coral-glow/40 bg-card/40 p-10 text-center">
      <p>{error.message}</p>
    </div>
  ),
  component: GoalDetail,
});

function GoalDetail() {
  const { goal } = Route.useLoaderData();
  const { progress, toggleGoal } = useHerbalProgress();
  const active = !!progress.goalsActive[goal.id];

  return (
    <article className="space-y-8">
      <Link
        to="/alchemists-path/goals"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All goals
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{goal.name}</h1>
          <p className="mt-3 max-w-prose text-lg text-muted-foreground">{goal.summary}</p>
        </div>
        <label className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-2 text-xs text-muted-foreground">
          <Checkbox checked={active} onCheckedChange={() => toggleGoal(goal.id)} />
          Track this goal
        </label>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold text-foreground">Ally herbs</h2>
        <div className="flex flex-wrap gap-2">
          {goal.herbs.map((slug) => {
            const h = getHerb(slug);
            return (
              <Link
                key={slug}
                to="/alchemists-path/materia-medica/$slug"
                params={{ slug }}
                className="rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs text-foreground hover:bg-secondary"
              >
                {h?.name ?? slug}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">Protocol</h2>
        <ol className="mt-3 space-y-2">
          {goal.protocol.map((step, i) => (
            <li
              key={i}
              className="rounded-lg border border-border/50 bg-background/40 p-3 text-sm text-muted-foreground"
            >
              <span className="mr-2 font-semibold text-foreground">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-leaf-glow/40 bg-card/40 p-6">
        <p className="text-xs uppercase tracking-widest text-leaf-glow">Foundational recipe</p>
        <h2 className="mt-1 text-xl font-bold text-foreground">{goal.recipe.name}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Ingredients</p>
            <ul className="mt-1 space-y-1 text-sm text-foreground">
              {goal.recipe.ingredients.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Method</p>
            <p className="mt-1 text-sm text-muted-foreground">{goal.recipe.method}</p>
          </div>
        </div>
      </section>
    </article>
  );
}
