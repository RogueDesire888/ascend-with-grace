import { createFileRoute, Link } from "@tanstack/react-router";
import {
  tiers,
  hundredDayChallenge,
  pushHandsProgression,
  pushHandsDrills,
  dailyProtocols,
} from "@/lib/tai-chi-data";
import { useTaiChiProgress, currentTier } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/mastery")({
  head: () => ({
    meta: [
      { title: "Path to Mastery — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "5-tier curriculum, 100-day form challenge, push-hands ladder with 10 partner drills, and daily ritual protocols.",
      },
    ],
  }),
  component: MasteryPage,
});

function MasteryPage() {
  const { progress, toggleChallengeDay, setPushHandsTier } = useTaiChiProgress();
  const { current, postureCount, goalCount } = currentTier(progress);
  const completedDays = Object.values(progress.challengeDays).filter(Boolean).length;

  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Curriculum</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Path to Mastery</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi mastery is measured in years and decades, not weeks. The map below shows what
          to expect at each stage and how to deepen your practice — without rushing past the
          floor that everything else stands on.
        </p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ background: current.color, boxShadow: `0 0 16px ${current.color}` }}
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-orchid-glow">Current tier</p>
            <p className="text-lg font-bold text-foreground">{current.name}</p>
          </div>
          <div className="ml-auto grid grid-cols-3 gap-3 text-center text-xs">
            <div>
              <p className="text-2xl font-bold text-foreground">{postureCount}</p>
              <p className="text-muted-foreground">postures</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{goalCount}</p>
              <p className="text-muted-foreground">goals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{progress.daysPracticed}</p>
              <p className="text-muted-foreground">days</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Five tiers</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Not a belt system — Tai Chi traditionally has none. A personal map of what serious
          practice tends to look like at each stage. Tiers unlock as your tracked postures,
          goals, and practice days grow.
        </p>
        <div className="mt-5 space-y-3">
          {tiers.map((t) => {
            const isCurrent = t.id === current.id;
            return (
              <article
                key={t.id}
                className={`rounded-2xl border p-5 ${
                  isCurrent ? "border-primary bg-primary/10" : "border-border/50 bg-card/40"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: t.color }}
                  />
                  <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                  {isCurrent && (
                    <span className="rounded-full bg-orchid-glow/15 px-2 py-0.5 text-xs text-orchid-glow">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm italic text-muted-foreground">{t.why}</p>
                <ul className="mt-3 space-y-1 text-sm text-foreground">
                  {t.curriculum.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Required to unlock: {t.required.postures} postures · {t.required.goals} goals
                  · {t.required.daysPracticed} days practiced
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">100-day form challenge</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Daily practice for 100 consecutive days. Each block of 10 days has a focus.
          Completed: <strong className="text-foreground">{completedDays}</strong> / 100.
        </p>
        <div className="mt-5 grid grid-cols-10 gap-1 sm:grid-cols-20">
          {hundredDayChallenge.map((d) => {
            const done = !!progress.challengeDays[d.day];
            return (
              <button
                key={d.day}
                onClick={() => toggleChallengeDay(d.day)}
                title={`Day ${d.day}: ${d.focus}`}
                className={`aspect-square rounded text-[0.55rem] ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/50 bg-card/40 text-muted-foreground hover:border-primary/40"
                }`}
              >
                {d.day}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Tip: hover any day to see its focus.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Push hands progression</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Five tiers of partner work. Each presupposes the last; do not skip. Mark a tier as
          reached only when a teacher or senior partner confirms it — self-assessment is
          unreliable in tui shou.
        </p>
        <div className="mt-5 space-y-3">
          {pushHandsProgression.map((p) => {
            const reached = progress.pushHandsTier >= p.tier;
            return (
              <article
                key={p.tier}
                className={`rounded-2xl border p-5 ${
                  reached
                    ? "border-orchid-glow bg-orchid-glow/10"
                    : "border-border/50 bg-card/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">
                    Tier {p.tier}: {p.name}
                  </h3>
                  <button
                    onClick={() => setPushHandsTier(reached ? p.tier - 1 : p.tier)}
                    className="rounded-full border border-border/60 px-3 py-1 text-xs"
                  >
                    {reached ? "Reset" : "Mark reached"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-orchid-glow">Prerequisite: {p.prerequisite}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.practice}</p>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {p.signs.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Push-hands drill library</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The actual drills that fill each tier. Run them in order; loop the early ones
          forever.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {pushHandsDrills.map((d) => (
            <article
              key={d.slug}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                Tier {d.tier} · {d.contact} · {d.step}
              </p>
              <p className="mt-1 font-bold text-foreground">{d.name}</p>
              <p className="text-xs italic text-muted-foreground">{d.pinyin}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="text-orchid-glow">Goal: </span>
                {d.goal}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{d.protocol}</p>
              <p className="mt-2 text-xs text-coral-glow">
                Common errors: {d.errors.join("; ")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Trains: {d.jin.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Daily ritual protocols</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Five ready-made dosages depending on what your day allows. Pick one. Do it. Repeat.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {dailyProtocols.map((p) => (
            <article key={p.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {p.duration}
              </p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{p.name}</h3>
              <p className="mt-1 text-xs italic text-muted-foreground">{p.whenToDo}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.goal}</p>
              <ul className="mt-3 space-y-1 text-sm text-foreground">
                {p.blocks.map((b, i) => (
                  <li key={i}>
                    <span className="text-orchid-glow">{b.time}: </span>
                    {b.do}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/tools" className="text-orchid-glow underline">
          → Open the practice timer and journal
        </Link>
      </p>
    </article>
  );
}
