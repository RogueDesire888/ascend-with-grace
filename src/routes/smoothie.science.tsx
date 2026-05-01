import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { nutrients, studies, getIngredientName, type NutrientFact } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/science")({
  head: () => ({
    meta: [
      { title: "Science of the Smoothie — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content: "Phytochemistry, the nutrient atlas, and 16 peer-reviewed studies behind smoothie practice.",
      },
    ],
  }),
  component: ScienceIndex,
});

const klasses: NutrientFact["klass"][] = [
  "Vitamin",
  "Mineral",
  "Polyphenol",
  "Carotenoid",
  "Fibre",
  "Fat",
  "Protein",
];

function ScienceIndex() {
  const [klass, setKlass] = useState<NutrientFact["klass"] | "All">("All");
  const filtered = klass === "All" ? nutrients : nutrients.filter((n) => n.klass === klass);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">The Science of the Smoothie</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A blender is a chemistry lab. These are the molecules and the studies that justify the
          daily ritual.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-foreground">Nutrient Atlas</h2>
        <div className="mt-3 scrollbar-none flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setKlass("All")}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
              klass === "All"
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border/60 bg-card/40 text-muted-foreground"
            }`}
          >
            All
          </button>
          {klasses.map((k) => (
            <button
              key={k}
              onClick={() => setKlass(k)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                klass === k
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filtered.map((n) => (
            <div key={n.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-primary">{n.klass}</p>
              <p className="font-semibold text-foreground">{n.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.whatItDoes}</p>
              <p className="mt-2 text-xs">
                <span className="font-semibold">Best from:</span>{" "}
                {n.bestFromBlender.map((s, i) => (
                  <span key={s}>
                    <Link
                      to="/smoothie/ingredients/$slug"
                      params={{ slug: s }}
                      className="text-primary hover:underline"
                    >
                      {getIngredientName(s)}
                    </Link>
                    {i < n.bestFromBlender.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground">Studies that shape the codex</h2>
        <div className="mt-4 space-y-3">
          {studies.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-primary">{s.topic}</p>
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">
                {s.journal} · {s.year}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.finding}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">→ {s.bottomLine}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
