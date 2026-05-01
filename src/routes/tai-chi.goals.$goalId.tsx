import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getGoal, getPostureName, goals as allGoals, allStudies } from "@/lib/tai-chi-data";
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
      <Link to="/tai-chi/goals" className="mt-3 inline-block text-orchid-glow underline">
        All goals
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 p-6">{error.message}</div>
  ),
  component: GoalDetail,
});

const cautionsByGoal: Record<string, string[]> = {
  balance: [
    "Practice near a wall or sturdy chair for the first weeks.",
    "Avoid eyes-closed standing if you have unmanaged vertigo.",
  ],
  "knee-osteoarthritis": [
    "Keep stances higher than instinct says; never let knee pass over toe.",
    "Stop and reassess any sharp knee pain — Tai Chi should never aggravate the joint.",
  ],
  "blood-pressure": [
    "If on aggressive antihypertensives, sit before standing transitions for the first month.",
    "Avoid breath retention; use only natural nasal breath.",
  ],
  cognition: [
    "If MCI is advanced, practice with a partner or in a class for safety.",
  ],
  "anxiety-depression": [
    "If panic-prone, keep eyes soft-open rather than closed.",
    "Pair practice with professional care, not as a replacement.",
  ],
  sleep: ["Avoid practice within 2 hours of bedtime; mornings or late afternoon work best."],
  fibromyalgia: [
    "Begin at very low intensity; increase only when post-session fatigue resolves within 24 h.",
  ],
  parkinsons: [
    "Practice with a partner or wall nearby. Forward step is generally safer than backward.",
  ],
  immune: [],
  "martial-skill": [
    "Push hands is not a fight. Calibrate force to your partner. Injury is failure.",
  ],
};

const graduateTo: Record<string, { id: string; label: string; why: string }> = {
  balance: {
    id: "knee-osteoarthritis",
    label: "Knee Osteoarthritis",
    why: "Once your balance steadies, joint-protective practice becomes available.",
  },
  "knee-osteoarthritis": {
    id: "balance",
    label: "Balance & Falls Prevention",
    why: "With knee comfort restored, deepen falls-prevention work.",
  },
  "blood-pressure": {
    id: "anxiety-depression",
    label: "Anxiety & Depression",
    why: "The same vagal mechanisms that lower BP regulate mood.",
  },
  cognition: {
    id: "balance",
    label: "Balance & Falls Prevention",
    why: "Cognitive-motor cross-training compounds.",
  },
  "anxiety-depression": {
    id: "sleep",
    label: "Sleep",
    why: "Mood stabilization and sleep restoration mutually reinforce.",
  },
  sleep: {
    id: "blood-pressure",
    label: "Blood Pressure",
    why: "Restored sleep is itself antihypertensive — extend the work.",
  },
  fibromyalgia: {
    id: "anxiety-depression",
    label: "Anxiety & Depression",
    why: "Fibromyalgia and mood share inflammatory and autonomic substrates.",
  },
  parkinsons: {
    id: "balance",
    label: "Balance & Falls Prevention",
    why: "Continue and broaden balance work.",
  },
  immune: {
    id: "sleep",
    label: "Sleep",
    why: "Sleep is the dominant lever on immune function.",
  },
  "martial-skill": {
    id: "balance",
    label: "Balance & Falls Prevention",
    why: "Push hands tests rooting; rooting is balance under load.",
  },
};

function GoalDetail() {
  const data = Route.useLoaderData() as { goal: NonNullable<ReturnType<typeof getGoal>> };
  const { goal } = data;
  const { progress, toggleGoal } = useTaiChiProgress();
  const tracked = !!progress.goals[goal.id];
  const cautions = cautionsByGoal[goal.id] ?? [];
  const next = graduateTo[goal.id];
  const nextGoal = next ? allGoals.find((g) => g.id === next.id) : undefined;
  const relatedStudies = allStudies.filter((s) => s.category === goal.id).slice(0, 4);

  // weekly schedule heuristic
  const weeklySchedule = [
    { day: "Mon", do: goal.protocol[0] ?? "Practice the form, slowly." },
    { day: "Tue", do: "Rest or a 7-minute reset (Wu Ji + Cloud Hands)." },
    { day: "Wed", do: goal.protocol[1] ?? "Practice the form, slowly." },
    { day: "Thu", do: "Light qigong or breathwork." },
    { day: "Fri", do: goal.protocol[2] ?? goal.protocol[0] },
    { day: "Sat", do: "Long-form day — full sequence twice through." },
    { day: "Sun", do: "Stillness: 15 minutes zhan zhuang." },
  ];

  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">
          Evidence: {goal.evidenceLevel}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">{goal.label}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">{goal.blurb}</p>
        <p className="mt-2 text-sm text-orchid-glow">{goal.duration}</p>
        <button
          onClick={() => toggleGoal(goal.id)}
          className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold ${
            tracked
              ? "border border-orchid-glow bg-orchid-glow/15"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {tracked ? "✓ Working on this" : "Mark as a goal"}
        </button>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Protocol
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {goal.protocol.map((p: string, i: number) => (
            <li key={i}>
              {i + 1}. {p}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Suggested weekly schedule
        </h3>
        <div className="grid gap-2 sm:grid-cols-7">
          {weeklySchedule.map((d) => (
            <div
              key={d.day}
              className="rounded-xl border border-border/40 bg-background/40 p-3 text-xs"
            >
              <p className="font-semibold text-foreground">{d.day}</p>
              <p className="mt-1 text-muted-foreground">{d.do}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Posture sequence
          </h3>
          <ul className="space-y-2 text-sm">
            {goal.practices.map((s: string) => (
              <li key={s}>
                <Link
                  to="/tai-chi/postures/$slug"
                  params={{ slug: s }}
                  className="text-foreground hover:text-orchid-glow"
                >
                  → {getPostureName(s)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Breath / Qigong
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {goal.pranayama.map((p: string, i: number) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      </section>

      {cautions.length > 0 && (
        <section className="rounded-2xl border border-coral-glow/40 bg-coral-glow/5 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-coral-glow">
            Cautions
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {cautions.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Research
        </h3>
        <p className="text-sm text-muted-foreground">{goal.research}</p>
        {relatedStudies.length > 0 && (
          <div className="mt-4 space-y-2">
            {relatedStudies.map((s) => (
              <div
                key={s.id}
                className="rounded-lg border border-border/40 bg-background/40 p-3 text-sm"
              >
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">
                  {s.authors} · {s.journal} ({s.year})
                </p>
                <p className="mt-1 text-xs text-foreground/80">{s.outcome}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {next && nextGoal && (
        <section className="rounded-2xl border border-orchid-glow/40 bg-orchid-glow/5 p-5">
          <p className="text-xs uppercase tracking-widest text-orchid-glow">When you're ready</p>
          <Link
            to="/tai-chi/goals/$goalId"
            params={{ goalId: next.id }}
            className="mt-1 block text-lg font-bold text-foreground hover:underline"
          >
            Graduate to: {next.label} →
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{next.why}</p>
        </section>
      )}

      <Link
        to="/tai-chi/goals"
        className="inline-block text-sm text-orchid-glow underline"
      >
        ← All goals
      </Link>
    </article>
  );
}
