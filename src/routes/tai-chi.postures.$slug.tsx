import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPosture, postures, forms as allForms } from "@/lib/tai-chi-data";
import { useTaiChiProgress } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/postures/$slug")({
  head: ({ params }) => {
    const p = getPosture(params.slug);
    return {
      meta: [
        { title: p ? `${p.english} (${p.pinyin}) — Ascend` : "Posture — Ascend" },
        {
          name: "description",
          content: p?.description.slice(0, 160) ?? "Tai Chi posture detail.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const posture = getPosture(params.slug);
    if (!posture) throw notFound();
    return { posture };
  },
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
      <p>Posture not found.</p>
      <Link to="/tai-chi/forms" className="mt-3 inline-block text-orchid-glow underline">
        Library
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 p-6">{error.message}</div>
  ),
  component: PostureDetail,
});

function PostureDetail() {
  const data = Route.useLoaderData() as { posture: NonNullable<ReturnType<typeof getPosture>> };
  const { posture } = data;
  const { progress, togglePosture } = useTaiChiProgress();
  const tracked = !!progress.postures[posture.slug];

  // related: same family, different posture
  const related = postures
    .filter((p) => p.slug !== posture.slug && p.family === posture.family)
    .slice(0, 4);

  // forms that include it
  const inForms = allForms.filter((f) =>
    [...f.ideaSequence, ...f.signaturePostures].includes(posture.slug),
  );

  return (
    <article className="space-y-10">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          <span>{posture.level}</span>
          <span>·</span>
          <span>{posture.family}</span>
          <span>·</span>
          <span>{posture.styles.join(" / ")}</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{posture.english}</h1>
        <p className="text-lg italic text-orchid-glow">
          {posture.pinyin} · {posture.chinese}
        </p>
        <p className="max-w-prose text-muted-foreground">{posture.description}</p>
        <button
          onClick={() => togglePosture(posture.slug)}
          className={`mt-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${
            tracked
              ? "border border-orchid-glow bg-orchid-glow/15 text-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {tracked ? "✓ In your practice" : "Add to my practice"}
        </button>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Subtle body
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <p>
            <span className="text-muted-foreground">Breath: </span>
            {posture.breath}
          </p>
          <p>
            <span className="text-muted-foreground">Jin: </span>
            {posture.jin.join(", ")}
          </p>
          <p>
            <span className="text-muted-foreground">Appears in: </span>
            {posture.appearsIn.length || "—"} forms
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Alignment" items={posture.alignment} />
        <Section title="Cues" items={posture.cues} />
        <Section title="Application" items={posture.application} />
        <Section title="Common errors" items={posture.commonErrors} tone="warn" />
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Suggested dosage
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong className="text-foreground">Day 1–7:</strong> Learn the shape. 5 reps each side, twice per day.</li>
            <li>• <strong className="text-foreground">Week 2–4:</strong> 8 reps, looking for one cue per session.</li>
            <li>• <strong className="text-foreground">Month 2+:</strong> Embed in form practice; isolate when something specific feels off.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Contraindications &amp; cautions
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Acute knee injury — work the upper-body component only until cleared.</li>
            <li>• Vertigo — practice near a wall for the first weeks.</li>
            <li>• Hypertension on aggressive medication — sit before standing transitions.</li>
            <li>• Pregnancy — avoid deep stances and any held breath; pace via natural breath.</li>
          </ul>
        </div>
      </section>

      {inForms.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-foreground">Appears in</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {inForms.slice(0, 6).map((f) => (
              <Link
                key={f.slug}
                to="/tai-chi/forms/$slug"
                params={{ slug: f.slug }}
                className="rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/60"
              >
                <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                  {f.style} · {f.postureCount} postures
                </p>
                <p className="mt-1 font-semibold text-foreground">{f.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-foreground">Related postures ({posture.family})</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/tai-chi/postures/$slug"
                params={{ slug: p.slug }}
                className="rounded-2xl border border-border/50 bg-card/40 p-3 transition-colors hover:border-primary/60"
              >
                <p className="text-sm font-semibold text-foreground">{p.english}</p>
                <p className="text-xs italic text-muted-foreground">{p.pinyin}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link to="/tai-chi/forms" className="inline-block text-sm text-orchid-glow underline">
        ← Library
      </Link>
    </article>
  );
}

function Section({ title, items, tone }: { title: string; items: string[]; tone?: "warn" }) {
  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <h3
        className={`mb-3 text-sm font-semibold uppercase tracking-widest ${
          tone === "warn" ? "text-coral-glow" : "text-orchid-glow"
        }`}
      >
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((it, i) => (
          <li key={i}>• {it}</li>
        ))}
      </ul>
    </section>
  );
}
