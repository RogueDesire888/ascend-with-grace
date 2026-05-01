import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGoal, getPostureName } from "@/lib/tai-chi-data";
import { useTaiChiProgress } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/goals/$goalId")({
  head: ({ params }) => {
    const g = getGoal(params.goalId);
    return {
      meta: [
        { title: g ? `${g.label} — Tai Chi | Ascend` : "Tai Chi Goal" },
        { name: "description", content: g?.blurb ?? "Tai Chi goal protocol." },
      ],
    };
  },
  loader: ({ params }) => {
    const goal = getGoal(params.goalId);
    if (!goal) throw notFound();
    return { goal };
  },
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
      <p>Goal not found.</p>
      <Link to="/tai-chi/goals" className="mt-3 inline-block text-orchid-glow underline">All goals</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 p-6">{error.message}</div>
  ),
  component: GoalDetail,
});

function GoalDetail() {
  const data = Route.useLoaderData() as { goal: NonNullable<ReturnType<typeof getGoal>> };
  const { goal } = data;
  const { progress, toggleGoal } = useTaiChiProgress();
  const tracked = !!progress.goals[goal.id];

  return (
    <article className="space-y-8">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Evidence: {goal.evidenceLevel}</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">{goal.label}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">{goal.blurb}</p>
        <p className="mt-2 text-sm text-orchid-glow">{goal.duration}</p>
        <button
          onClick={() => toggleGoal(goal.id)}
          className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold ${
            tracked ? "border border-orchid-glow bg-orchid-glow/15" : "bg-primary text-primary-foreground"
          }`}
        >
          {tracked ? "✓ Working on this" : "Mark as a goal"}
        </button>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Protocol</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {goal.protocol.map((p: string, i: number) => <li key={i}>{i + 1}. {p}</li>)}
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Posture sequence</h3>
          <ul className="space-y-2 text-sm">
            {goal.practices.map((s: string) => (
              <li key={s}>
                <Link to="/tai-chi/postures/$slug" params={{ slug: s }} className="text-foreground hover:text-orchid-glow">
                  → {getPostureName(s)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Breath / Qigong</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {goal.pranayama.map((p: string, i: number) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Research</h3>
        <p className="text-sm text-muted-foreground">{goal.research}</p>
      </section>

      <Link to="/tai-chi/goals" className="inline-block text-sm text-orchid-glow underline">← All goals</Link>
    </article>
  );
}
