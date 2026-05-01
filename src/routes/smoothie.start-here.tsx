import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Sprout, FlaskConical, Trophy } from "lucide-react";
import { ranks, pantryTiers, getIngredientName } from "@/lib/smoothie-data";

export const Route = createFileRoute("/smoothie/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — The Smoothie Codex | Ascend" },
      {
        name: "description",
        content:
          "Begin your smoothie practice: pantry tiers, ranks, daily ritual, and the codex map.",
      },
    ],
  }),
  component: StartHere,
});

function StartHere() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-border/50 bg-card/50 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Start Here
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">Welcome to the Codex</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A smoothie is the simplest unit of nutritional architecture: a glass that carries
          fibre, polyphenols, healthy fats and protein into a single 60-second ritual. This
          codex is the long-form companion — eighty-plus ingredient monographs, twenty-plus
          recipes, the science behind every claim, and a builder to design your own.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/smoothie/recipes"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Browse recipes
          </Link>
          <Link
            to="/smoothie/builder"
            className="rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-semibold"
          >
            Open the builder
          </Link>
          <Link
            to="/smoothie/ingredients"
            className="rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-semibold"
          >
            Tour the pantry
          </Link>
        </div>
      </header>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">The Daily Practice</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "1. Liquid", d: "Pour a cup of liquid first (oat milk, coconut water, kefir). Liquid first means the blade engages instantly." },
            { t: "2. Soft + frozen", d: "Add greens and powders, then frozen fruit on top — gravity pulls them down into the vortex." },
            { t: "3. Blend & sip", d: "60 seconds on high. Drink within 20 minutes for best texture and oxidation-sensitive nutrients." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Pantry Tiers</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pantryTiers.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-xs uppercase tracking-widest text-primary">{p.weeklyBudget}</p>
              <p className="mt-1 text-lg font-semibold">{p.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.notes}</p>
              <p className="mt-3 text-xs">
                <span className="font-semibold">Keep:</span>{" "}
                <span className="text-muted-foreground">
                  {p.keep.slice(0, 8).map(getIngredientName).join(", ")}
                  {p.keep.length > 8 ? "…" : ""}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 text-right">
          <Link to="/smoothie/pantry" className="text-sm text-primary underline">
            Full pantry guide →
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Ranks of the Codex</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {ranks.map((r) => (
            <div
              key={r.id}
              className="flex gap-3 rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <span
                className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ background: r.color, boxShadow: `0 0 10px ${r.color}` }}
              />
              <div>
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.required.recipes} recipes · {r.required.ingredients} ingredients
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">The Codex Map</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { to: "/smoothie/ingredients", t: "Ingredients", d: "80+ monographs with macros, pairings, and stories." },
            { to: "/smoothie/recipes", t: "Recipes", d: "20+ blends, each with a why and a variation tree." },
            { to: "/smoothie/goals", t: "By Goal", d: "Energy, gut, recovery, sleep, hormonal — protocols and rotations." },
            { to: "/smoothie/builder", t: "Builder", d: "Architect your own blend with live macros and pairing checks." },
            { to: "/smoothie/science", t: "Science", d: "Phytochemistry, the nutrient atlas, and 16 peer-reviewed studies." },
            { to: "/smoothie/rituals", t: "Rituals", d: "Sunrise, post-workout, break-fast, evening wind-down." },
            { to: "/smoothie/pantry", t: "Pantry", d: "Three tiers from $25/wk to encyclopedist." },
            { to: "/smoothie/mastery", t: "Mastery", d: "The 5-level path with quests and badges." },
            { to: "/smoothie/tools", t: "Tools", d: "Hydration calc, glycemic estimator, freezer-prep planner." },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="rounded-2xl border border-border/40 bg-background/40 p-4 transition-colors hover:bg-secondary"
            >
              <p className="font-semibold text-foreground">{s.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
