import { createFileRoute } from "@tanstack/react-router";
import { tiers, hundredDayChallenge, pushHandsProgression } from "@/lib/tai-chi-data";
import { useTaiChiProgress, currentTier } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/mastery")({
  head: () => ({
    meta: [
      { title: "Path to Mastery — Tai Chi | Ascend" },
      { name: "description", content: "5-tier curriculum, 100-day form challenge, and the push hands progression." },
    ],
  }),
  component: MasteryPage,
});

function MasteryPage() {
  const { progress, toggleChallengeDay, setPushHandsTier } = useTaiChiProgress();
  const { current } = currentTier(progress);

  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Curriculum</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Path to Mastery</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi mastery is measured in years and decades, not weeks. The map below shows what to expect
          at each stage and how to deepen your practice.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Five tiers</h2>
        <div className="mt-5 space-y-3">
          {tiers.map((t) => {
            const isCurrent = t.id === current.id;
            return (
              <div
                key={t.id}
                className={`rounded-2xl border p-5 ${isCurrent ? "border-primary bg-primary/10" : "border-border/50 bg-card/40"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-full" style={{ background: t.color }} />
                  <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                  {isCurrent && <span className="text-xs text-orchid-glow">Current</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.why}</p>
                <ul className="mt-3 space-y-1 text-sm text-foreground">
                  {t.curriculum.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Required: {t.required.postures} postures · {t.required.goals} goals · {t.required.daysPracticed} days practiced
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">100-day form challenge</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Daily practice for 100 consecutive days. Each block of 10 days has a focus.
        </p>
        <div className="mt-5 grid grid-cols-5 gap-1 sm:grid-cols-10">
          {hundredDayChallenge.map((d) => {
            const done = !!progress.challengeDays[d.day];
            return (
              <button
                key={d.day}
                onClick={() => toggleChallengeDay(d.day)}
                title={`Day ${d.day}: ${d.focus}`}
                className={`aspect-square rounded text-[0.6rem] ${
                  done ? "bg-primary text-primary-foreground" : "border border-border/50 bg-card/40 text-muted-foreground"
                }`}
              >
                {d.day}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Push hands progression</h2>
        <div className="mt-5 space-y-3">
          {pushHandsProgression.map((p) => {
            const reached = progress.pushHandsTier >= p.tier;
            return (
              <div key={p.tier} className={`rounded-2xl border p-5 ${reached ? "border-orchid-glow bg-orchid-glow/10" : "border-border/50 bg-card/40"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Tier {p.tier}: {p.name}</h3>
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
                  {p.signs.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
