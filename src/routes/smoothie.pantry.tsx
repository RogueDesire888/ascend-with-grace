import { createFileRoute, Link } from "@tanstack/react-router";
import { pantryTiers, equipment, getIngredientName } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/pantry")({
  head: () => ({
    meta: [
      { title: "Pantry & Equipment — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "Three pantry tiers, blender comparisons, and the gear that earns its counter space.",
      },
    ],
  }),
  component: PantryPage,
});

function PantryPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Pantry & Equipment</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The codex is only useful if you can build from it. These are the three pantries that cover
          every recipe in the library, and the blenders that will see you through them.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold">Pantry tiers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {pantryTiers.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-xs uppercase tracking-widest text-primary">{p.weeklyBudget}</p>
              <p className="mt-1 text-lg font-semibold">{p.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.notes}</p>
              <ul className="mt-3 flex flex-wrap gap-1">
                {p.keep.map((s) => (
                  <li key={s}>
                    <Link
                      to="/smoothie/ingredients/$slug"
                      params={{ slug: s }}
                      className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-[0.65rem] hover:bg-secondary"
                    >
                      {getIngredientName(s)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Blenders</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {equipment.map((b) => (
            <div key={b.name} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{b.name}</p>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[0.65rem] text-foreground">
                  {b.tier} · {b.watts}w
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{b.bestFor}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary">Strengths</p>
                  <ul className="ml-4 list-disc text-xs text-muted-foreground">
                    {b.strengths.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary">Weaknesses</p>
                  <ul className="ml-4 list-disc text-xs text-muted-foreground">
                    {b.weaknesses.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
