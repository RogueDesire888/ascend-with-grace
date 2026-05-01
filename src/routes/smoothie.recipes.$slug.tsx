import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getRecipe, getIngredientName, getGoal } from "@/lib/smoothie-data";
import { useSmoothieProgress } from "@/lib/smoothie-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/smoothie/recipes/$slug")({
  head: ({ params }) => {
    const r = getRecipe(params.slug);
    return {
      meta: [
        { title: `${r?.name ?? "Recipe"} — The Smoothie Codex | Ascend` },
        { name: "description", content: r?.tagline ?? "Smoothie recipe." },
      ],
    };
  },
  loader: ({ params }) => {
    const r = getRecipe(params.slug);
    if (!r) throw notFound();
    return { recipe: r };
  },
  notFoundComponent: () => (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold">Recipe not found</h1>
      <Link to="/smoothie/recipes" className="mt-3 inline-block text-primary underline">
        Back to recipes
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-3xl border border-destructive/40 bg-card/40 p-6">
      <p className="font-semibold">Couldn't load recipe.</p>
      <p className="text-xs text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe: r } = Route.useLoaderData();
  const { progress, toggleRecipe } = useSmoothieProgress();
  const made = !!progress.recipes[r.slug];

  return (
    <article className="space-y-8">
      <Link to="/smoothie/recipes" className="text-xs text-primary underline">
        ← Recipe Library
      </Link>

      <header className="rounded-3xl border border-border/50 bg-card/50 p-8">
        <p className="text-6xl">{r.emoji}</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground">{r.name}</h1>
        <p className="mt-1 text-xs uppercase tracking-widest text-primary">
          {r.difficulty} · {r.diet.join(", ")} · {r.season.join(", ")}
        </p>
        <p className="mt-3 text-muted-foreground">{r.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{r.story}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.goals.map((g) => {
            const goal = getGoal(g);
            return goal ? (
              <Link
                key={g}
                to="/smoothie/goals/$goalId"
                params={{ goalId: g }}
                className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-foreground hover:bg-primary/20"
              >
                {goal.name}
              </Link>
            ) : null;
          })}
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Checkbox id="made" checked={made} onCheckedChange={() => toggleRecipe(r.slug)} />
          <label htmlFor="made" className="text-sm">
            I've made this
          </label>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Ingredients
          </p>
          <ul className="space-y-2 text-sm">
            {r.ingredients.map((ing) => (
              <li key={ing.slug} className="flex items-baseline justify-between gap-3">
                <Link
                  to="/smoothie/ingredients/$slug"
                  params={{ slug: ing.slug }}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {getIngredientName(ing.slug)}
                </Link>
                <span className="text-xs text-muted-foreground">{ing.amount}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Method
          </p>
          <ol className="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
            {r.instructions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
        <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Approx macros
          </p>
          <ul className="space-y-1 text-sm">
            <li>Calories: {r.approxMacros.calories}</li>
            <li>Protein: {r.approxMacros.protein} g</li>
            <li>Fat: {r.approxMacros.fat} g</li>
            <li>Carbs: {r.approxMacros.carbs} g</li>
            <li>Fibre: {r.approxMacros.fibre} g</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Variations
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
            {r.variations.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
