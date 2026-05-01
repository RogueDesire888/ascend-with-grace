import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ingredients, getIngredient } from "@/lib/smoothie-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/smoothie/tools")({
  head: () => ({
    meta: [
      { title: "Tools — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "Glycemic estimator, hydration calculator, and freezer-prep planner.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Tools</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three small calculators that take the guesswork out of daily blending.
        </p>
      </header>
      <GlycemicEstimator />
      <HydrationCalc />
      <FreezerPrepPlanner />
    </div>
  );
}

function GlycemicEstimator() {
  const [picks, setPicks] = useState<string[]>([]);
  const score = useMemo(() => {
    return picks.reduce((s, slug) => {
      const i = getIngredient(slug);
      if (!i) return s;
      return s + (i.glycemicLoad === "high" ? 2 : i.glycemicLoad === "medium" ? 1 : 0);
    }, 0);
  }, [picks]);
  const verdict = score >= 5 ? "High — pair with fat + fibre" : score >= 3 ? "Medium" : "Low";

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Glycemic Estimator
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick the ingredients in your blend to gauge the glucose impact.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ingredients.slice(0, 30).map((i) => {
          const active = picks.includes(i.slug);
          return (
            <button
              key={i.slug}
              onClick={() =>
                setPicks((p) => (active ? p.filter((s) => s !== i.slug) : [...p, i.slug]))
              }
              className={`rounded-full border px-3 py-1 text-xs ${
                active
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/60 bg-background/40 text-muted-foreground"
              }`}
            >
              {i.emoji} {i.name}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm">
        Score: <span className="font-semibold text-foreground">{score}</span> ·{" "}
        <span className="text-primary">{verdict}</span>
      </p>
    </section>
  );
}

function HydrationCalc() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState<"low" | "moderate" | "high">("moderate");
  const ml = Math.round(
    weight * (activity === "low" ? 30 : activity === "moderate" ? 35 : 45),
  );
  const smoothies = Math.max(1, Math.round(ml / 500));

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Hydration Calculator
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Body weight (kg)
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Activity
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as "low" | "moderate" | "high")}
            className="mt-1 w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm">
        Daily fluid target:{" "}
        <span className="font-semibold text-foreground">{ml} ml</span> · A 500 ml smoothie covers ~
        {Math.round((500 / ml) * 100)}% — plan for around{" "}
        <span className="font-semibold text-foreground">{smoothies}</span> blend
        {smoothies === 1 ? "" : "s"} plus water.
      </p>
    </section>
  );
}

function FreezerPrepPlanner() {
  const [days, setDays] = useState(7);
  const fruitGrams = days * 250;
  const greenGrams = days * 50;
  const proteinGrams = days * 30;
  const bags = days;

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Freezer Prep Planner
      </p>
      <div className="mt-3 flex items-center gap-3">
        <label className="text-sm">
          Days to prep
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value) || 1)}
            className="ml-2 w-20 rounded-lg border border-border/60 bg-background/40 px-3 py-1"
          />
        </label>
      </div>
      <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
        <li>Frozen fruit: <span className="text-foreground font-semibold">{fruitGrams} g</span></li>
        <li>Greens (washed, portioned): <span className="text-foreground font-semibold">{greenGrams} g</span></li>
        <li>Protein scoops or yogurt: <span className="text-foreground font-semibold">{proteinGrams} g</span></li>
        <li>Freezer bags / jars: <span className="text-foreground font-semibold">{bags}</span></li>
      </ul>
      <Button variant="outline" size="sm" className="mt-4">
        Print shopping list
      </Button>
    </section>
  );
}
