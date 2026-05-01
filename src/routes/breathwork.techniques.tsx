import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { techniques, type Goal, type Level, type Tradition } from "@/lib/breathwork-data";

export const Route = createFileRoute("/breathwork/techniques")({
  head: () => ({
    meta: [
      { title: "Library of Techniques — Breathwork | Ascend" },
      { name: "description", content: "Filter and explore 15 breathwork techniques across traditions and goals." },
    ],
  }),
  component: TechniqueLibrary,
});

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];
const goalOpts: Goal[] = ["focus", "sleep", "stress", "energy", "performance", "healing"];
const traditionOpts: Tradition[] = ["Yogic", "Modern", "Functional", "Therapeutic"];

function TechniqueLibrary() {
  const [level, setLevel] = useState<Level | "all">("all");
  const [goal, setGoal] = useState<Goal | "all">("all");
  const [tradition, setTradition] = useState<Tradition | "all">("all");
  const [maxDuration, setMaxDuration] = useState(120);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      techniques.filter(
        (t) =>
          (level === "all" || t.level === level) &&
          (goal === "all" || t.goals.includes(goal)) &&
          (tradition === "all" || t.tradition === tradition) &&
          t.durationMinutes <= maxDuration,
      ),
    [level, goal, tradition, maxDuration],
  );

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= 3
          ? [...prev.slice(1), slug]
          : [...prev, slug],
    );
  };

  const compared = compareSlugs
    .map((s) => techniques.find((t) => t.slug === s))
    .filter((t): t is (typeof techniques)[number] => Boolean(t));

  return (
    <article className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Library of Techniques</h1>
          <p className="mt-3 max-w-prose text-lg text-muted-foreground">
            Fifteen techniques across yogic, modern, functional, and therapeutic traditions.
          </p>
        </div>
        <Link
          to="/breathwork/techniques/traditions"
          className="rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm text-foreground hover:bg-secondary"
        >
          Explore Traditions →
        </Link>
      </header>

      <section className="quest-panel-air rounded-3xl p-5 sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-glow">
          Comparator
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          Click up to three techniques below to compare ratios, breath rate, and engagement.
        </p>
        {compared.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">
            Nothing selected yet — pick a card to start comparing.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {compared.map((t) => {
              const cycleLen = t.pacer.inhale + t.pacer.holdIn + t.pacer.exhale + t.pacer.holdOut;
              const bpm = cycleLen > 0 ? Math.round(60 / cycleLen) : 0;
              return (
                <div
                  key={t.slug}
                  className="rounded-xl border border-border/50 bg-background/40 p-4"
                >
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.pacer.inhale}-{t.pacer.holdIn}-{t.pacer.exhale}-{t.pacer.holdOut}
                  </p>
                  <p className="mt-2 text-xs">≈ {bpm} breaths/min</p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-card/60">
                    <div
                      className="h-full bg-cyan-glow"
                      style={{ width: `${(t.engagement / 10) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    Engagement {t.engagement}/10
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid gap-4 rounded-2xl border border-border/50 bg-card/40 p-4 md:grid-cols-4">
        <Filter label="Level" value={level} onChange={setLevel} options={["all", ...levels]} />
        <Filter label="Goal" value={goal} onChange={setGoal} options={["all", ...goalOpts]} />
        <Filter
          label="Tradition"
          value={tradition}
          onChange={setTradition}
          options={["all", ...traditionOpts]}
        />
        <label className="block text-sm">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            Max duration: {maxDuration} min
          </span>
          <input
            type="range"
            min={3}
            max={120}
            value={maxDuration}
            onChange={(e) => setMaxDuration(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </label>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const selected = compareSlugs.includes(t.slug);
          return (
            <div
              key={t.slug}
              className="quest-panel-air flex flex-col rounded-2xl p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                <span>{t.level}</span>
                <span>·</span>
                <span>{t.tradition}</span>
                <span>·</span>
                <span>{t.durationMinutes} min</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
              <p className="mt-1 line-clamp-3 flex-1 text-sm text-muted-foreground">
                {t.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {t.goals.map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-border/50 px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  to="/breathwork/techniques/$slug"
                  params={{ slug: t.slug }}
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Open →
                </Link>
                <button
                  onClick={() => toggleCompare(t.slug)}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    selected
                      ? "border-cyan-glow bg-cyan-glow/15 text-foreground"
                      : "border-border/60 text-muted-foreground"
                  }`}
                >
                  {selected ? "✓ Comparing" : "Compare"}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}

function Filter<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
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
