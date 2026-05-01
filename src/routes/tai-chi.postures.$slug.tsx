import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPosture } from "@/lib/tai-chi-data";
import { useTaiChiProgress } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/postures/$slug")({
  head: ({ params }) => {
    const p = getPosture(params.slug);
    return {
      meta: [
        { title: p ? `${p.english} (${p.pinyin}) — Ascend` : "Posture — Ascend" },
        { name: "description", content: p?.description.slice(0, 160) ?? "Tai Chi posture detail." },
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
      <Link to="/tai-chi/forms" className="mt-3 inline-block text-orchid-glow underline">Library</Link>
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

  return (
    <article className="space-y-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
          <span>{posture.level}</span>
          <span>·</span>
          <span>{posture.family}</span>
          <span>·</span>
          <span>{posture.styles.join(" / ")}</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{posture.english}</h1>
        <p className="text-lg italic text-orchid-glow">{posture.pinyin} · {posture.chinese}</p>
        <p className="max-w-prose text-muted-foreground">{posture.description}</p>
        <button
          onClick={() => togglePosture(posture.slug)}
          className={`mt-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${
            tracked ? "border border-orchid-glow bg-orchid-glow/15 text-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {tracked ? "✓ In your practice" : "Add to my practice"}
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Alignment" items={posture.alignment} />
        <Section title="Cues" items={posture.cues} />
        <Section title="Application" items={posture.application} />
        <Section title="Common errors" items={posture.commonErrors} tone="warn" />
      </div>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Subtle body</h3>
        <div className="grid gap-3 sm:grid-cols-3 text-sm">
          <p><span className="text-muted-foreground">Breath: </span>{posture.breath}</p>
          <p><span className="text-muted-foreground">Jin: </span>{posture.jin.join(", ")}</p>
          <p><span className="text-muted-foreground">Appears in: </span>{posture.appearsIn.length || "—"} forms</p>
        </div>
      </section>

      <Link to="/tai-chi/forms" className="inline-block text-sm text-orchid-glow underline">← Library</Link>
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
