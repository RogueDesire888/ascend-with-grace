import { createFileRoute, Link } from "@tanstack/react-router";
import { ranks } from "@/lib/smoothie-data";
import { useSmoothieProgress, currentRank } from "@/lib/smoothie-progress";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/smoothie/mastery")({
  head: () => ({
    meta: [
      { title: "Path to Mastery — The Smoothie Codex | Ascend" },
      { name: "description", content: "Six ranks from Sprout to Grand Smoothie Sage." },
    ],
  }),
  component: MasteryPage,
});

function MasteryPage() {
  const { progress } = useSmoothieProgress();
  const { current, next, recipeCount, ingCount } = currentRank(progress);

  const recipeProgress = next
    ? Math.min(100, Math.round((recipeCount / next.required.recipes) * 100))
    : 100;
  const ingProgress = next
    ? Math.min(100, Math.round((ingCount / next.required.ingredients) * 100))
    : 100;

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-border/50 bg-card/50 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Current rank
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span
            className="inline-block h-4 w-4 rounded-full"
            style={{ background: current.color, boxShadow: `0 0 14px ${current.color}` }}
          />
          <h1 className="text-3xl font-bold text-foreground">{current.name}</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{current.description}</p>
        {next ? (
          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Next: {next.name}
            </p>
            <div>
              <p className="mb-1 flex justify-between text-xs">
                <span>Recipes made</span>
                <span>
                  {recipeCount} / {next.required.recipes}
                </span>
              </p>
              <Progress value={recipeProgress} />
            </div>
            <div>
              <p className="mb-1 flex justify-between text-xs">
                <span>Ingredients tried</span>
                <span>
                  {ingCount} / {next.required.ingredients}
                </span>
              </p>
              <Progress value={ingProgress} />
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-primary">
            You've reached the highest rank. The codex is yours.
          </p>
        )}
      </header>

      <section>
        <h2 className="text-2xl font-semibold">All Ranks</h2>
        <div className="mt-4 space-y-3">
          {ranks.map((r) => {
            const earned = recipeCount >= r.required.recipes && ingCount >= r.required.ingredients;
            return (
              <div
                key={r.id}
                className={`rounded-2xl border p-4 ${
                  earned ? "border-primary/40 bg-primary/5" : "border-border/50 bg-card/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: r.color, boxShadow: `0 0 10px ${r.color}` }}
                  />
                  <p className="font-semibold text-foreground">{r.name}</p>
                  {earned && (
                    <span className="ml-auto text-[0.65rem] uppercase tracking-widest text-primary">
                      Earned
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.required.recipes} recipes · {r.required.ingredients} ingredients
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-center text-sm text-muted-foreground">
        Need a refresher? <Link to="/smoothie/start-here" className="text-primary underline">Return to Start Here</Link>.
      </p>
    </div>
  );
}
