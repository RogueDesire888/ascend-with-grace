import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ingredients, categories, type IngredientCategoryId } from "@/lib/smoothie-data";
import { useSmoothieProgress } from "@/lib/smoothie-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/smoothie/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "80+ ingredient monographs with macros, glycemic load, pairings, swaps, and sourcing.",
      },
    ],
  }),
  component: IngredientsIndex,
});

function IngredientsIndex() {
  const [filter, setFilter] = useState<IngredientCategoryId | "all">("all");
  const [q, setQ] = useState("");
  const { progress, toggleIngredient } = useSmoothieProgress();

  const filtered = useMemo(() => {
    return ingredients.filter((i) => {
      if (filter !== "all" && i.category !== filter) return false;
      if (q && !i.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [filter, q]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Materia Smoothia</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every ingredient that earns a place in the codex — ten categories, one role per category, a story
          for each. Track ingredients you've tried to climb the ranks.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Search ingredients…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm sm:max-w-xs"
        />
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
              filter === "all"
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border/60 bg-card/40 text-muted-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                filter === c.id
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const tried = !!progress.ingredientsLogged[i.slug];
          return (
            <div
              key={i.slug}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:bg-card/60"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  to="/smoothie/ingredients/$slug"
                  params={{ slug: i.slug }}
                  className="flex-1"
                >
                  <p className="text-2xl leading-none">{i.emoji}</p>
                  <p className="mt-2 font-semibold text-foreground">{i.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                    {i.category} · GL {i.glycemicLoad}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {i.benefits[0]}
                  </p>
                </Link>
                <Checkbox
                  checked={tried}
                  onCheckedChange={() => toggleIngredient(i.slug)}
                  aria-label={`Mark ${i.name} as tried`}
                />
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">No ingredients match.</p>
      )}
    </div>
  );
}
