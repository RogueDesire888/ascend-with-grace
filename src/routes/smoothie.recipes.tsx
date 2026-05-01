import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { recipes, goals } from "@/lib/smoothie-data";
import { useSmoothieProgress } from "@/lib/smoothie-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/smoothie/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes — The Smoothie Codex | Ascend" },
      { name: "description", content: "Curated smoothie recipes by goal, season, and difficulty." },
    ],
  }),
  component: RecipesIndex,
});

function RecipesIndex() {
  const [goal, setGoal] = useState<string>("all");
  const [q, setQ] = useState("");
  const { progress, toggleRecipe } = useSmoothieProgress();

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (goal !== "all" && !r.goals.includes(goal)) return false;
      if (q && !(r.name.toLowerCase().includes(q.toLowerCase()) || r.tagline.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [goal, q]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Recipe Library</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Each recipe explains its design — why these ingredients, in this order, in this ratio.
          Mark recipes you've made to advance your rank.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Search recipes…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm sm:max-w-xs"
        />
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          <button
            onClick={() => setGoal("all")}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
              goal === "all"
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border/60 bg-card/40 text-muted-foreground"
            }`}
          >
            All goals
          </button>
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                goal === g.id
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((r) => {
          const made = !!progress.recipes[r.slug];
          return (
            <div
              key={r.slug}
              className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:bg-card/60"
            >
              <div className="flex items-start justify-between gap-3">
                <Link
                  to="/smoothie/recipes/$slug"
                  params={{ slug: r.slug }}
                  className="flex-1"
                >
                  <p className="text-3xl leading-none">{r.emoji}</p>
                  <p className="mt-2 font-semibold text-foreground">{r.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                    {r.difficulty} · {r.diet.join(", ")}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.tagline}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    ~{r.approxMacros.calories} kcal · {r.approxMacros.protein}P /{" "}
                    {r.approxMacros.fat}F / {r.approxMacros.carbs}C / {r.approxMacros.fibre}fb
                  </p>
                </Link>
                <Checkbox checked={made} onCheckedChange={() => toggleRecipe(r.slug)} aria-label="Made" />
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">No recipes match.</p>
      )}
    </div>
  );
}
