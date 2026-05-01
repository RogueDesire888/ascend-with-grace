import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGoal, getTechnique } from "@/lib/breathwork-data";
import { BreathPacer } from "@/components/breathwork/BreathPacer";

export const Route = createFileRoute("/breathwork/goals/$goalId")({
  loader: ({ params }) => {
    const goal = getGoal(params.goalId);
    if (!goal) throw notFound();
    return { goal };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.goal.label} — Breathwork | Ascend` },
          { name: "description", content: loaderData.goal.blurb },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
      <p className="font-semibold text-foreground">Goal not found.</p>
      <Link to="/breathwork/goals" className="text-cyan-glow underline">
        Back to goals
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-coral-glow/50 bg-card/40 p-6">
      <p className="text-sm text-foreground">{error.message}</p>
    </div>
  ),
  component: GoalDetail,
});

function GoalDetail() {
  const { goal } = Route.useLoaderData();
  const recs = goal.recommended.map((s: string) => getTechnique(s)).filter(Boolean);
  const featured = recs[0];

  return (
    <article className="space-y-8">
      <Link to="/breathwork/goals" className="text-xs text-cyan-glow">
        ← All goals
      </Link>
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{goal.label}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">{goal.blurb}</p>
      </header>
      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-lg font-bold text-foreground">Why It Works</h2>
        <p className="mt-2 text-muted-foreground">{goal.why}</p>
      </section>

      {featured && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">Featured Practice</h2>
          <BreathPacer preset={featured.pacer} title={featured.name} />
        </section>
      )}

      <section>
        <h2 className="mb-3 text-lg font-bold text-foreground">Recommended Techniques</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {recs.map((t: any) => (
            <Link
              key={t!.slug}
              to="/breathwork/techniques/$slug"
              params={{ slug: t!.slug }}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:bg-secondary"
            >
              <p className="font-semibold text-foreground">{t!.name}</p>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t!.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
