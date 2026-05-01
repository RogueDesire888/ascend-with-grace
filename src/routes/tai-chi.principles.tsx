import { createFileRoute } from "@tanstack/react-router";
import { thirteenPostures, tenEssentials, classics } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/principles")({
  head: () => ({
    meta: [
      { title: "Principles & Classics — Tai Chi | Ascend" },
      { name: "description", content: "The 13 postures, Yang Chengfu's 10 Essentials, and selected Tai Chi Classics." },
    ],
  }),
  component: PrinciplesPage,
});

function PrinciplesPage() {
  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Theory</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Principles & Classics</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The internal map: the 13 fundamental postures, the 10 essentials of Yang Chengfu, and excerpts
          from the foundational Tai Chi Classics.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">13 Postures (8 energies + 5 steps)</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {thirteenPostures.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">{e.category}</p>
              <p className="mt-1 font-bold text-foreground">{e.english} — {e.pinyin} ({e.chinese})</p>
              {e.direction && <p className="text-xs text-muted-foreground">{e.direction}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
              <p className="mt-1 text-xs italic text-orchid-glow">Felt: {e.felt}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Yang Chengfu's 10 Essentials</h2>
        <ol className="mt-5 space-y-3">
          {tenEssentials.map((e) => (
            <li key={e.number} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-sm font-semibold text-orchid-glow">{e.number}. {e.english}</p>
              <p className="text-xs italic text-muted-foreground">{e.chinese}</p>
              <p className="mt-2 text-sm text-foreground">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">From the Classics</h2>
        <div className="mt-5 space-y-4">
          {classics.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">{c.era} · {c.attributedTo}</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{c.title}</h3>
              <blockquote className="mt-3 border-l-2 border-orchid-glow pl-4 text-sm italic text-foreground">
                "{c.passage}"
              </blockquote>
              <p className="mt-2 text-sm text-muted-foreground">{c.commentary}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
