import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, AlertTriangle, Sprout, BookOpen, FlaskConical } from "lucide-react";
import { getHerb, getHerbName, getAction } from "@/lib/herbal-data";
import { useHerbalProgress } from "@/lib/herbal-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/alchemists-path/materia-medica/$slug")({
  loader: ({ params }) => {
    const herb = getHerb(params.slug);
    if (!herb) throw notFound();
    return { herb };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.herb.name ?? "Herb"} — Materia Medica | Ascend` },
      {
        name: "description",
        content: loaderData?.herb
          ? `${loaderData.herb.name} (${loaderData.herb.latin}): energetics, constituents, traditional and modern use, doses, and safety.`
          : "Herb monograph",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold text-foreground">Herb not found</h1>
      <p className="mt-2 text-muted-foreground">
        Back to{" "}
        <Link to="/alchemists-path/materia-medica" className="text-leaf-glow underline">
          Materia Medica
        </Link>
        .
      </p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-3xl border border-coral-glow/40 bg-card/40 p-10 text-center">
      <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: HerbPage,
});

function HerbPage() {
  const { herb } = Route.useLoaderData();
  const { progress, toggleMonograph } = useHerbalProgress();
  const studied = !!progress.monographsStudied[herb.slug];

  return (
    <article className="space-y-8">
      <Link
        to="/alchemists-path/materia-medica"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Materia Medica
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{herb.name}</h1>
          <p className="mt-1 text-lg italic text-muted-foreground">{herb.latin}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-leaf-glow">
            {herb.family} · {herb.partsUsed.join(", ")}
          </p>
        </div>
        <label className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-2 text-xs text-muted-foreground">
          <Checkbox checked={studied} onCheckedChange={() => toggleMonograph(herb.slug)} />
          Mark monograph studied
        </label>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Temperature" value={herb.energetics.temperature} />
        <Stat label="Moisture" value={herb.energetics.moisture} />
        <Stat label="Tone" value={herb.energetics.tone} />
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <BookOpen className="h-4 w-4 text-leaf-glow" /> Traditional Use
        </h2>
        <p className="mt-3 whitespace-pre-line text-muted-foreground">{herb.traditional}</p>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <FlaskConical className="h-4 w-4 text-leaf-glow" /> Modern Use &amp; Evidence
        </h2>
        <p className="mt-3 whitespace-pre-line text-muted-foreground">{herb.modern}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Block title="Actions">
          <ul className="space-y-1.5 text-sm">
            {herb.actions.map((a) => {
              const act = getAction(a);
              return (
                <li key={a} className="rounded-lg border border-border/50 bg-background/40 p-2">
                  <p className="font-semibold capitalize text-foreground">{act?.name ?? a}</p>
                  {act && <p className="text-xs text-muted-foreground">{act.definition}</p>}
                </li>
              );
            })}
          </ul>
        </Block>
        <Block title="Affinities">
          <div className="flex flex-wrap gap-2">
            {herb.affinities.map((a) => (
              <span key={a} className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 text-xs text-foreground">
                {a}
              </span>
            ))}
          </div>
        </Block>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">Key Constituents</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {herb.constituents.map((c) => (
            <li key={c.name} className="rounded-lg border border-border/50 bg-background/40 p-3">
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="text-[0.7rem] uppercase tracking-widest text-leaf-glow">{c.klass}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">Preparations &amp; Doses</h2>
        <ul className="mt-3 space-y-2">
          {herb.preparations.map((p, i) => (
            <li key={i} className="rounded-lg border border-border/50 bg-background/40 p-3">
              <p className="text-sm font-semibold text-foreground">{p.preparation}</p>
              <p className="text-sm text-muted-foreground">{p.amount}</p>
              {p.notes && <p className="mt-1 text-xs italic text-muted-foreground">{p.notes}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-coral-glow/40 bg-card/40 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <AlertTriangle className="h-4 w-4 text-coral-glow" /> Safety
        </h2>
        <p className="mt-2 text-xs uppercase tracking-widest text-coral-glow">{herb.safety}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-foreground">Contraindications</p>
            <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
              {herb.contraindications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Drug Interactions</p>
            <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
              {herb.interactions.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Sprout className="h-4 w-4 text-leaf-glow" /> Harvest &amp; Sustainability
        </h2>
        <p className="mt-2 text-xs uppercase tracking-widest text-leaf-glow">
          {herb.sustainability}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{herb.harvest}</p>
      </section>

      {herb.related.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">Related Allies</h2>
          <div className="flex flex-wrap gap-2">
            {herb.related.map((r) => (
              <Link
                key={r}
                to="/alchemists-path/materia-medica/$slug"
                params={{ slug: r }}
                className="rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs text-foreground hover:bg-secondary"
              >
                {getHerbName(r)}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-3 text-center">
      <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize text-foreground">{value}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-6">
      <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
      {children}
    </div>
  );
}
