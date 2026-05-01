import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  asanas,
  type AsanaFamily,
  type Level,
  type Tradition,
  type YogaGoal,
} from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/asanas")({
  head: () => ({
    meta: [
      { title: "Asana Library — Yoga | Ascend" },
      { name: "description", content: "Filter and explore yoga asanas across families and traditions." },
    ],
  }),
  component: AsanaLibrary,
});

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];
const families: AsanaFamily[] = [
  "Standing", "Seated", "Supine", "Prone", "Inversion",
  "Backbend", "Forwardbend", "Twist", "Balance", "Restorative",
];
const goalOpts: YogaGoal[] = ["back-pain", "anxiety", "sleep", "flexibility", "strength", "focus", "hormonal"];
const traditionOpts: Tradition[] = ["Hatha", "Ashtanga", "Iyengar", "Vinyasa", "Kundalini", "Yin", "Restorative", "Bikram"];

function AsanaLibrary() {
  const [level, setLevel] = useState<Level | "all">("all");
  const [family, setFamily] = useState<AsanaFamily | "all">("all");
  const [goal, setGoal] = useState<YogaGoal | "all">("all");
  const [tradition, setTradition] = useState<Tradition | "all">("all");

  const filtered = useMemo(
    () =>
      asanas.filter(
        (a) =>
          (level === "all" || a.level === level) &&
          (family === "all" || a.family === family) &&
          (goal === "all" || a.goals.includes(goal)) &&
          (tradition === "all" || a.traditions.includes(tradition)),
      ),
    [level, family, goal, tradition],
  );

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Asana Library</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          {asanas.length} asanas with Sanskrit names, alignment, drishti, bandhas, and
          contraindications. Filter by level, family, goal, or tradition.
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-border/50 bg-card/40 p-4 md:grid-cols-4">
        <Filter label="Level" value={level} onChange={setLevel} options={["all", ...levels]} />
        <Filter label="Family" value={family} onChange={setFamily} options={["all", ...families]} />
        <Filter label="Goal" value={goal} onChange={setGoal} options={["all", ...goalOpts]} />
        <Filter label="Tradition" value={tradition} onChange={setTradition} options={["all", ...traditionOpts]} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link
            key={a.slug}
            to="/yoga/asanas/$slug"
            params={{ slug: a.slug }}
            className="quest-panel-air flex flex-col rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              <span>{a.level}</span>
              <span>·</span>
              <span>{a.family}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{a.english}</h3>
            <p className="text-xs italic text-orchid-glow">{a.sanskrit}</p>
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{a.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {a.goals.map((g) => (
                <span
                  key={g}
                  className="rounded-full border border-border/50 px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
      {filtered.length === 0 && (
        <p className="text-sm italic text-muted-foreground">No asanas match those filters.</p>
      )}
    </article>
  );
}

function Filter<T extends string>({
  label, value, onChange, options,
}: { label: string; value: T; onChange: (v: T) => void; options: readonly T[]; }) {
  return (
    <label className="block text-sm">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "all" ? "All" : o}
          </option>
        ))}
      </select>
    </label>
  );
}
