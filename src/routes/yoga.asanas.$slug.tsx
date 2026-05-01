import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAsana, getAsanaName } from "@/lib/yoga-data";
import { useYogaProgress } from "@/lib/yoga-progress";

export const Route = createFileRoute("/yoga/asanas/$slug")({
  head: ({ params }) => {
    const a = getAsana(params.slug);
    return {
      meta: [
        { title: a ? `${a.english} (${a.sanskrit}) — Ascend` : "Asana — Ascend" },
        { name: "description", content: a?.description.slice(0, 160) ?? "Yoga asana detail." },
      ],
    };
  },
  loader: ({ params }) => {
    const asana = getAsana(params.slug);
    if (!asana) throw notFound();
    return { asana } as const;
  },
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
      <p className="text-foreground">Asana not found.</p>
      <Link to="/yoga/asanas" className="mt-3 inline-block text-orchid-glow underline">
        Back to library
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-6">
      <p className="text-foreground">Could not load this asana.</p>
      <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: AsanaDetail,
});

function AsanaDetail() {
  const { asana } = Route.useLoaderData();
  const { progress, toggleAsana } = useYogaProgress();
  const tracked = !!progress.asanas[asana.slug];

  return (
    <article className="space-y-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          <span>{asana.level}</span>
          <span>·</span>
          <span>{asana.family}</span>
          <span>·</span>
          <span>{asana.holdSeconds}s · {asana.breathCount} breaths</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{asana.english}</h1>
        <p className="text-lg italic text-orchid-glow">{asana.sanskrit}</p>
        <p className="max-w-prose text-muted-foreground">{asana.description}</p>
        <button
          onClick={() => toggleAsana(asana.slug)}
          className={`mt-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${
            tracked
              ? "bg-orchid-glow/15 text-foreground border border-orchid-glow"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {tracked ? "✓ In your practice" : "Add to my practice"}
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Alignment" items={asana.alignment} />
        <Section title="Cues" items={asana.cues} />
        <Section title="Benefits" items={asana.benefits} />
        <Section title="Modifications" items={asana.modifications} />
        <Section title="Contraindications" items={asana.contraindications} tone="warn" />
        <Section title="Primary Muscles" items={asana.primaryMuscles} />
      </div>

      <section className="quest-panel-air rounded-2xl p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Subtle Body
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <p><span className="text-muted-foreground">Drishti: </span>{asana.drishti}</p>
          <p><span className="text-muted-foreground">Bandhas: </span>{asana.bandhas.join(", ") || "—"}</p>
          <p><span className="text-muted-foreground">Traditions: </span>{asana.traditions.join(", ")}</p>
        </div>
      </section>

      {(asana.prep.length > 0 || asana.counter.length > 0) && (
        <section className="grid gap-6 md:grid-cols-2">
          {asana.prep.length > 0 && (
            <RelatedList title="Prep poses" slugs={asana.prep} />
          )}
          {asana.counter.length > 0 && (
            <RelatedList title="Counter poses" slugs={asana.counter} />
          )}
        </section>
      )}

      <Link to="/yoga/asanas" className="inline-block text-sm text-orchid-glow underline">
        ← Back to library
      </Link>
    </article>
  );
}

function Section({ title, items, tone }: { title: string; items: string[]; tone?: "warn" }) {
  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <h3 className={`mb-3 text-sm font-semibold uppercase tracking-widest ${tone === "warn" ? "text-coral-glow" : "text-orchid-glow"}`}>
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((it, i) => <li key={i}>• {it}</li>)}
      </ul>
    </section>
  );
}

function RelatedList({ title, slugs }: { title: string; slugs: string[] }) {
  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">{title}</h3>
      <ul className="space-y-2 text-sm">
        {slugs.map((s) => (
          <li key={s}>
            <Link to="/yoga/asanas/$slug" params={{ slug: s }} className="text-foreground hover:text-orchid-glow">
              → {getAsanaName(s)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
