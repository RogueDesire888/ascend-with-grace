import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ingredients,
  categories,
  getIngredient,
  getIngredientName,
  type IngredientCategoryId,
} from "@/lib/smoothie-data";
import { useSmoothieProgress } from "@/lib/smoothie-progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/smoothie/builder")({
  head: () => ({
    meta: [
      { title: "Smoothie Architect — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "Architect a custom blend with live macro estimates, glycemic load, and pairing checks.",
      },
    ],
  }),
  component: BuilderPage,
});

const SLOTS: { key: IngredientCategoryId; label: string; suggested: string }[] = [
  { key: "liquid", label: "1. Liquid (1 cup)", suggested: "oat-milk" },
  { key: "fruit", label: "2. Fruit (1 cup)", suggested: "mixed-berries" },
  { key: "leafy-green", label: "3. Greens (1 cup)", suggested: "spinach" },
  { key: "protein", label: "4. Protein (1 scoop)", suggested: "whey-isolate" },
  { key: "fat", label: "5. Fat (1 tbsp)", suggested: "almond-butter" },
  { key: "booster", label: "6. Booster (½ tsp)", suggested: "ashwagandha" },
];

function BuilderPage() {
  const { saveCustomRecipe } = useSmoothieProgress();
  const [picks, setPicks] = useState<Record<IngredientCategoryId, string>>(() =>
    Object.fromEntries(SLOTS.map((s) => [s.key, s.suggested])) as Record<IngredientCategoryId, string>,
  );
  const [name, setName] = useState("My Blend");

  const blend = useMemo(() => {
    const ings = Object.values(picks).map((slug) => getIngredient(slug)).filter(Boolean);
    const macros = ings.reduce(
      (acc, i) => {
        if (!i) return acc;
        const factor = i.category === "liquid" ? 2.4 : i.category === "fruit" ? 1.4 : i.category === "fat" || i.category === "protein" ? 0.3 : 0.5;
        acc.calories += i.nutrients.calories * factor;
        acc.protein += i.nutrients.protein * factor;
        acc.fat += i.nutrients.fat * factor;
        acc.carbs += i.nutrients.carbs * factor;
        acc.fibre += i.nutrients.fibre * factor;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 },
    );
    const glycemicScore = ings.reduce(
      (s, i) => s + (i?.glycemicLoad === "high" ? 2 : i?.glycemicLoad === "medium" ? 1 : 0),
      0,
    );
    const glycemic = glycemicScore >= 4 ? "High" : glycemicScore >= 2 ? "Medium" : "Low";
    return { ings, macros, glycemic };
  }, [picks]);

  const onSave = () => {
    saveCustomRecipe({
      id: crypto.randomUUID(),
      name,
      ingredients: SLOTS.map((s) => ({ slug: picks[s.key], amount: s.label })),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">The Smoothie Architect</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Pick one ingredient per slot. Macros and glycemic load update live. Save the blend to your
          codex when you're proud of it.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {SLOTS.map((slot) => {
            const pool = ingredients.filter((i) => i.category === slot.key);
            return (
              <div key={slot.key} className="rounded-2xl border border-border/50 bg-card/40 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  {slot.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pool.map((i) => {
                    const active = picks[slot.key] === i.slug;
                    return (
                      <button
                        key={i.slug}
                        onClick={() => setPicks((p) => ({ ...p, [slot.key]: i.slug }))}
                        className={`rounded-full border px-3 py-1 text-xs ${
                          active
                            ? "border-primary bg-primary/15 text-foreground"
                            : "border-border/60 bg-background/40 text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {i.emoji} {i.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border/50 bg-card/50 p-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background/50 px-3 py-2 text-sm font-semibold"
          />
          <p className="mt-4 text-xs uppercase tracking-widest text-primary">Estimated macros</p>
          <ul className="mt-1 space-y-1 text-sm">
            <li>Calories: {Math.round(blend.macros.calories)}</li>
            <li>Protein: {Math.round(blend.macros.protein)} g</li>
            <li>Fat: {Math.round(blend.macros.fat)} g</li>
            <li>Carbs: {Math.round(blend.macros.carbs)} g</li>
            <li>Fibre: {Math.round(blend.macros.fibre)} g</li>
          </ul>
          <p className="mt-4 text-xs">
            <span className="font-semibold">Glycemic load:</span>{" "}
            <span className="text-muted-foreground">{blend.glycemic}</span>
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-primary">Your blend</p>
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
            {Object.entries(picks).map(([k, slug]) => (
              <li key={k}>
                <Link
                  to="/smoothie/ingredients/$slug"
                  params={{ slug }}
                  className="hover:text-primary"
                >
                  {getIngredientName(slug)}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={onSave} className="mt-5 w-full">
            Save to codex
          </Button>
        </aside>
      </section>

      <p className="text-xs text-muted-foreground">
        Categories of ingredients available:{" "}
        {categories.map((c) => `${c.emoji} ${c.name}`).join(" · ")}
      </p>
    </div>
  );
}
