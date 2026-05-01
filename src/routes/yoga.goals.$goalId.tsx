import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGoal, getAsanaName } from "@/lib/yoga-data";
import { useYogaProgress } from "@/lib/yoga-progress";

export const Route = createFileRoute("/yoga/goals/$goalId")({
  head: ({ params }) => {
    const g = getGoal(params.goalId);
    return {
      meta: [
        { title: g ? `${g.label} — Yoga | Ascend` : "Yoga Goal" },
        { name: "description", content: g?.blurb ?? "Yoga goal protocol." },
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
      <Link to="/yoga/goals" className="mt-3 inline-block text-orchid-glow underline">All goals</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 p-6">{error.message}</div>
  ),
  component: GoalDetail,
});

function GoalDetail() {
  const { goal } = Route.useLoaderData();
  const { progress, toggleGoal } = useYogaProgress();
  const tracked = !!progress.goals[goal.id];

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{goal.label}</h1>
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

      <section className="quest-panel-air rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Protocol</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {goal.protocol.map((p, i) => <li key={i}>{i + 1}. {p}</li>)}
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Asana sequence</h3>
          <ul className="space-y-2 text-sm">
            {goal.practices.map((s) => (
              <li key={s}>
                <Link to="/yoga/asanas/$slug" params={{ slug: s }} className="text-foreground hover:text-orchid-glow">
                  → {getAsanaName(s)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Pranayama</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {goal.pranayama.map((p, i) => <li key={i}>• {p}</li>)}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Research</h3>
        <p className="text-sm text-muted-foreground">{goal.research}</p>
      </section>

      <Link to="/yoga/goals" className="inline-block text-sm text-orchid-glow underline">← All goals</Link>
    </article>
  );
}
