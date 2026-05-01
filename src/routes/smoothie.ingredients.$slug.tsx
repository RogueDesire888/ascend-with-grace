import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getIngredient, getIngredientName, getCategory } from "@/lib/smoothie-data";
import { useSmoothieProgress } from "@/lib/smoothie-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/smoothie/ingredients/$slug")({
  head: ({ params }) => {
    const i = getIngredient(params.slug);
    return {
      meta: [
        { title: `${i?.name ?? "Ingredient"} — The Smoothie Codex | Ascend` },
        {
          name: "description",
          content: i?.story.slice(0, 150) ?? "Smoothie ingredient monograph.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const i = getIngredient(params.slug);
    if (!i) throw notFound();
    return { ingredient: i };
  },
  notFoundComponent: () => (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold">Ingredient not found</h1>
      <Link to="/smoothie/ingredients" className="mt-3 inline-block text-primary underline">
        Back to ingredients
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-3xl border border-destructive/40 bg-card/40 p-6">
      <p className="font-semibold">Couldn't load ingredient.</p>
      <p className="text-xs text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: IngredientDetail,
});

function IngredientDetail() {
  const { ingredient: i } = Route.useLoaderData();
  const cat = getCategory(i.category);
  const { progress, toggleIngredient } = useSmoothieProgress();
  const tried = !!progress.ingredientsLogged[i.slug];

  return (
    <article className="space-y-8">
      <Link to="/smoothie/ingredients" className="text-xs text-primary underline">
        ← Materia Smoothia
      </Link>

      <header className="rounded-3xl border border-border/50 bg-card/50 p-8">
        <p className="text-6xl">{i.emoji}</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground">{i.name}</h1>
        <p className="mt-1 text-xs uppercase tracking-widest text-primary">
          {cat?.emoji} {cat?.name} · Glycemic load {i.glycemicLoad}
        </p>
        <p className="mt-4 max-w-2xl text-muted-foreground">{i.story}</p>
        <div className="mt-4 flex items-center gap-2">
          <Checkbox
            id="tried"
            checked={tried}
            onCheckedChange={() => toggleIngredient(i.slug)}
          />
          <label htmlFor="tried" className="text-sm">
            I've used this in a blend
          </label>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Per 100 g (or ml)">
          <ul className="space-y-1 text-sm">
            <li>Calories: {i.nutrients.calories}</li>
            <li>Protein: {i.nutrients.protein} g</li>
            <li>Fat: {i.nutrients.fat} g</li>
            <li>Carbs: {i.nutrients.carbs} g</li>
            <li>Fibre: {i.nutrients.fibre} g</li>
            <li>Sugar: {i.nutrients.sugar} g</li>
          </ul>
        </Card>
        <Card title="Micronutrients">
          <div className="flex flex-wrap gap-2">
            {i.nutrients.micros.map((m) => (
              <span
                key={m}
                className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-xs"
              >
                {m}
              </span>
            ))}
          </div>
        </Card>
        <Card title="Benefits">
          <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
            {i.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Card>
        <Card title="Sourcing">
          <p className="text-sm text-muted-foreground">{i.sourcing}</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-primary">Season</p>
          <p className="text-sm text-muted-foreground">{i.season.join(", ")}</p>
        </Card>
        <Card title="Pairs well with">
          <div className="flex flex-wrap gap-2">
            {i.pairings.map((p) => (
              <Link
                key={p}
                to="/smoothie/ingredients/$slug"
                params={{ slug: p }}
                className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-xs hover:bg-secondary"
              >
                {getIngredientName(p)}
              </Link>
            ))}
          </div>
        </Card>
        <Card title="Swap for">
          <div className="flex flex-wrap gap-2">
            {i.swaps.map((p) => (
              <Link
                key={p}
                to="/smoothie/ingredients/$slug"
                params={{ slug: p }}
                className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-xs hover:bg-secondary"
              >
                {getIngredientName(p)}
              </Link>
            ))}
          </div>
        </Card>
        {i.contraindications.length > 0 && (
          <Card title="Heads up">
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              {i.contraindications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Card>
        )}
      </section>
    </article>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{title}</p>
      {children}
    </div>
  );
}
