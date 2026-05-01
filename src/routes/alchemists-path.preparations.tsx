import { createFileRoute } from "@tanstack/react-router";
import { preparations } from "@/lib/herbal-data";
import { useHerbalProgress } from "@/lib/herbal-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/alchemists-path/preparations")({
  head: () => ({
    meta: [
      { title: "Preparations — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Twelve preparation methods — tea, infusion, decoction, tincture, glycerite, oil, salve, syrup, vinegar, oxymel, ferment, spagyric — with method, ratios, and when to choose each.",
      },
    ],
  }),
  component: PreparationsPage,
});

function PreparationsPage() {
  const { progress, togglePreparation } = useHerbalProgress();

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Preparations</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Choosing how to prepare a plant is half the medicine. Each method extracts different
          constituents; the right vehicle delivers the right molecule to the right tissue. Tick
          each one off as you craft it.
        </p>
      </header>

      <ul className="space-y-4">
        {preparations.map((p) => {
          const crafted = !!progress.preparationsCrafted[p.slug];
          return (
            <li key={p.slug} className="rounded-3xl border border-border/50 bg-card/40 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{p.name}</h2>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    Vehicle: {p.vehicle}
                  </p>
                </div>
                <label className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
                  <Checkbox checked={crafted} onCheckedChange={() => togglePreparation(p.slug)} />
                  Crafted
                </label>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-widest text-leaf-glow">When to choose</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.whenToChoose}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-leaf-glow">Standard ratio</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.ratio}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-leaf-glow">Method</p>
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{p.method}</p>
              </div>

              {p.shelfLife && (
                <p className="mt-4 text-xs italic text-muted-foreground">
                  Shelf life: {p.shelfLife}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
