import { createFileRoute } from "@tanstack/react-router";
import { atRisk, interactions, herbs } from "@/lib/herbal-data";
import { AlertTriangle, Sprout } from "lucide-react";

export const Route = createFileRoute("/alchemists-path/safety")({
  head: () => ({
    meta: [
      { title: "Safety & Sustainability — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Drug interactions, contraindications, and sustainable harvest. United Plant Savers lists, alternatives, and red flags.",
      },
    ],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  const sustainabilityBuckets = ["Endangered", "At-Risk", "To-Watch", "Abundant"] as const;
  const grouped = sustainabilityBuckets.map((bucket) => ({
    bucket,
    items: herbs.filter((h) => h.sustainability === bucket),
  }));

  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Safety &amp; Sustainability</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Two halves of the same ethic: do no harm to the person, do no harm to the plant.
        </p>
      </header>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
          <AlertTriangle className="h-5 w-5 text-coral-glow" /> Drug-Herb Interactions
        </h2>
        <ul className="space-y-3">
          {interactions.map((i) => (
            <li
              key={`${i.herb}-${i.drug}`}
              className="rounded-2xl border border-coral-glow/40 bg-card/40 p-4"
            >
              <p className="text-xs uppercase tracking-widest text-coral-glow">{i.severity}</p>
              <p className="mt-1 font-semibold text-foreground">
                {i.herb} × {i.drug}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{i.mechanism}</p>
              <p className="mt-2 text-sm text-foreground">{i.guidance}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
          <Sprout className="h-5 w-5 text-leaf-glow" /> United Plant Savers — At-Risk Allies
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {atRisk.map((p) => (
            <li
              key={p.name}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold text-foreground">{p.name}</p>
              <p className="text-xs italic text-muted-foreground">{p.region}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Choose instead: </span>
                {p.alternative}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Sustainability Index</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {grouped.map(({ bucket, items }) => (
            <div
              key={bucket}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-xs uppercase tracking-widest text-leaf-glow">{bucket}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{items.length}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {items
                  .slice(0, 6)
                  .map((h) => h.name)
                  .join(", ")}
                {items.length > 6 ? "…" : ""}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
