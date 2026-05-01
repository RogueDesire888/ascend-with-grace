import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTechnique, getTechniqueName, studies } from "@/lib/breathwork-data";
import { BreathPacer } from "@/components/breathwork/BreathPacer";
import { useBreathProgress } from "@/lib/breathwork-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/breathwork/techniques/$slug")({
  loader: ({ params }) => {
    const t = getTechnique(params.slug);
    if (!t) throw notFound();
    return { technique: t };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.technique.name} — Breathwork | Ascend` },
          { name: "description", content: loaderData.technique.summary },
          { property: "og:title", content: `${loaderData.technique.name} — Breathwork | Ascend` },
          { property: "og:description", content: loaderData.technique.summary },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-6 text-center">
      <p className="font-semibold text-foreground">Technique not found.</p>
      <Link to="/breathwork/techniques" className="text-cyan-glow underline">
        Back to library
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-coral-glow/50 bg-card/40 p-6">
      <p className="text-sm text-foreground">{error.message}</p>
    </div>
  ),
  component: TechniqueDetail,
});

function TechniqueDetail() {
  const { technique } = Route.useLoaderData();
  const { progress, toggleTechnique } = useBreathProgress();
  const completed = !!progress.techniques[technique.slug];
  const linked = studies.filter((s) => s.techniques.includes(technique.slug));

  return (
    <article className="space-y-8">
      <Link to="/breathwork/techniques" className="text-xs text-cyan-glow">
        ← All techniques
      </Link>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {technique.level} · {technique.tradition} · {technique.durationMinutes} min
          </p>
          <h1 className="mt-1 text-4xl font-bold text-foreground sm:text-5xl">{technique.name}</h1>
          {technique.shortName && (
            <p className="mt-1 italic text-muted-foreground">{technique.shortName}</p>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-2 text-sm">
          <Checkbox
            checked={completed}
            onCheckedChange={() => toggleTechnique(technique.slug)}
          />
          {completed ? "Practiced ✓" : "Mark practiced"}
        </label>
      </header>

      <p className="max-w-prose text-lg text-muted-foreground">{technique.summary}</p>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="quest-panel-air rounded-3xl p-6">
          <h2 className="mb-3 text-lg font-bold text-foreground">Step-by-Step</h2>
          <ol className="space-y-2">
            {technique.steps.map((s: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/90">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-glow/50 text-xs text-cyan-glow">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <BreathPacer preset={technique.pacer} title="Pacer preset" />
      </section>

      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-lg font-bold text-foreground">Why It Works</h2>
        <p className="mt-2 text-muted-foreground">{technique.mechanism}</p>
      </section>

      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-lg font-bold text-foreground">Research</h2>
        <p className="mt-2 text-muted-foreground">{technique.research}</p>
        {linked.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm">
            {linked.map((s) => (
              <li key={s.id}>
                <a
                  href={`https://doi.org/${s.doi}`}
                  target="_blank"
                  rel="noopener"
                  className="text-cyan-glow underline"
                >
                  {s.title} ({s.year})
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-coral-glow/40 bg-background/40 p-6">
        <h2 className="text-lg font-bold text-foreground">Contraindications</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-foreground/90">
          {technique.contraindications.map((c: string) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {technique.related.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">Related</h2>
          <div className="flex flex-wrap gap-2">
            {technique.related.map((slug: string) => (
              <Link
                key={slug}
                to="/breathwork/techniques/$slug"
                params={{ slug }}
                className="rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-sm hover:bg-secondary"
              >
                {getTechniqueName(slug)} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
