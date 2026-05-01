import { createFileRoute } from "@tanstack/react-router";
import { styles, teachers, timeline } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/history")({
  head: () => ({
    meta: [
      { title: "History & Lineage — Tai Chi | Ascend" },
      { name: "description", content: "Origin of Tai Chi, the five family styles, and the masters who carried the art forward." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Lineage</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">History & Lineage</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          From a single village in Henan to 250 million practitioners worldwide. The story of Tai Chi is
          the story of an oral tradition surviving four centuries and crossing into modern medicine.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Timeline</h2>
        <ol className="mt-5 space-y-3">
          {timeline.map((t) => (
            <li key={t.year} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-sm font-semibold text-orchid-glow">{t.year}</p>
              <p className="mt-1 text-foreground">{t.event}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.significance}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">The five family styles</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {styles.map((s) => (
            <article key={s.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">{s.era}</p>
              <h3 className="mt-1 text-xl font-bold text-foreground">{s.id} Style</h3>
              <p className="text-sm italic text-muted-foreground">Founder: {s.founder}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.story}</p>
              <ul className="mt-3 space-y-1 text-sm text-foreground">
                {s.characteristics.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                Best for: {s.bestFor.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Key masters</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-orchid-glow">{t.style} · {t.era}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.contribution}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
