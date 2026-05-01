import { createFileRoute } from "@tanstack/react-router";
import { books, glossary, faq } from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/resources")({
  head: () => ({
    meta: [
      { title: "Resource Hub — Yoga | Ascend" },
      { name: "description", content: "Books, glossary, and FAQ for the yoga practitioner." },
    ],
  }),
  component: Resources,
});

function Resources() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Resource Hub</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Books, vocabulary, and the questions every practitioner eventually asks.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Essential Reading</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {books.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="font-bold text-foreground">{b.title}</h3>
              <p className="text-xs text-orchid-glow">{b.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.summary}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">Best for: {b.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Glossary</h2>
        <div className="grid gap-2 md:grid-cols-2">
          {glossary.map((g) => (
            <div key={g.term} className="rounded-xl border border-border/50 bg-card/40 p-3">
              <p className="font-semibold text-foreground">
                {g.term}
                {g.sanskrit && <span className="ml-2 text-xs italic text-orchid-glow">{g.sanskrit}</span>}
              </p>
              <p className="text-xs text-muted-foreground">{g.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faq.map((f, i) => (
            <details key={i} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <summary className="cursor-pointer font-semibold text-foreground">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
