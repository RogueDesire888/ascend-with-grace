import { createFileRoute } from "@tanstack/react-router";
import { belts, challenges } from "@/lib/yoga-data";
import { useYogaProgress, currentBelt } from "@/lib/yoga-progress";

export const Route = createFileRoute("/yoga/mastery")({
  head: () => ({
    meta: [
      { title: "Path to Mastery — Yoga | Ascend" },
      { name: "description", content: "The yoga belt system and progressive challenges." },
    ],
  }),
  component: Mastery,
});

function Mastery() {
  const { progress, toggleChallengeDay, setChallengeSignup } = useYogaProgress();
  const { current, asanaCount, goalCount } = currentBelt(progress);

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Path to Mastery</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Mastery is not a final pose. It is the willingness to keep arriving on the mat. Earn belts
          as your practice deepens.
        </p>
      </header>

      <section className="quest-panel-air rounded-3xl p-6">
        <p className="text-xs uppercase tracking-widest text-orchid-glow">Your belt</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-block h-4 w-4 rounded-full" style={{ background: current.color, boxShadow: `0 0 14px ${current.color}` }} />
          <h2 className="text-2xl font-bold text-foreground">{current.name}</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{current.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">{asanaCount} asanas tracked · {goalCount} goals tracked</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Belt System</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {belts.map((b) => (
            <div
              key={b.id}
              className={`rounded-2xl border p-5 ${b.id === current.id ? "border-orchid-glow bg-orchid-glow/10" : "border-border/50 bg-card/40"}`}
            >
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full" style={{ background: b.color }} />
                <h3 className="font-bold text-foreground">{b.name}</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Requires {b.required.asanas} asanas · {b.required.goals} goals
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Challenges</h2>
        <div className="space-y-6">
          {challenges.map((c) => {
            const signed = !!progress.challengeSignups[c.id];
            const done = progress.challenges[c.id] ?? {};
            const completed = Object.values(done).filter(Boolean).length;
            return (
              <div key={c.id} className="rounded-3xl border border-border/50 bg-card/40 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
                    <p className="mt-2 text-xs text-orchid-glow">{completed}/{c.durationDays} days complete</p>
                  </div>
                  <button
                    onClick={() => setChallengeSignup(c.id, !signed)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${signed ? "border border-orchid-glow bg-orchid-glow/15" : "bg-primary text-primary-foreground"}`}
                  >
                    {signed ? "✓ Signed up" : "Sign up"}
                  </button>
                </div>
                {signed && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {c.days.map((d) => {
                      const isDone = !!done[d.day];
                      return (
                        <button
                          key={d.day}
                          onClick={() => toggleChallengeDay(c.id, d.day)}
                          className={`rounded-xl border p-3 text-left text-xs ${isDone ? "border-orchid-glow bg-orchid-glow/10" : "border-border/50 bg-background/40"}`}
                        >
                          <p className="font-semibold text-foreground">{d.title}</p>
                          <p className="mt-1 text-muted-foreground">{d.prompt}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
