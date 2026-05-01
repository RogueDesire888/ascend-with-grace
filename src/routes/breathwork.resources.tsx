import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { books, faq, glossary } from "@/lib/breathwork-data";

export const Route = createFileRoute("/breathwork/resources")({
  head: () => ({
    meta: [
      { title: "Resource Hub — Breathwork | Ascend" },
      { name: "description", content: "Books, glossary, FAQ, and downloadable resources for breathwork practitioners." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const grouped = glossary.reduce<Record<string, typeof glossary>>((acc, t) => {
    const k = t.term[0].toUpperCase();
    (acc[k] ??= []).push(t);
    return acc;
  }, {});
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Resource Hub</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The bookshelf, the glossary, the FAQ, and a stack of downloadable scripts for teachers.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">The Bookshelf</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {books.map((b) => (
            <a
              key={b.title}
              href={b.link}
              target="_blank"
              rel="noopener"
              className="quest-panel-air block rounded-2xl p-4 hover:-translate-y-1 transition-transform"
            >
              <div className="mb-3 flex h-32 items-end justify-center rounded-lg bg-gradient-to-br from-cyan-glow/20 to-orchid-glow/20 p-3 text-center">
                <p className="font-semibold text-foreground">{b.title}</p>
              </div>
              <p className="text-xs text-cyan-glow">{b.author}</p>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{b.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Glossary</h2>
        <div className="mb-3 flex flex-wrap gap-1 text-xs">
          {Object.keys(grouped)
            .sort()
            .map((k) => (
              <a
                key={k}
                href={`#g-${k}`}
                className="rounded border border-border/60 bg-card/40 px-2 py-0.5 text-muted-foreground"
              >
                {k}
              </a>
            ))}
        </div>
        {Object.keys(grouped)
          .sort()
          .map((k) => (
            <div key={k} id={`g-${k}`} className="mb-5 scroll-mt-24">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-glow">{k}</h3>
              <div className="grid gap-2 md:grid-cols-2">
                {grouped[k].map((t) => (
                  <div key={t.term} className="rounded-lg border border-border/50 bg-background/40 p-3">
                    <p className="font-semibold text-foreground">{t.term}</p>
                    <p className="text-xs text-muted-foreground">{t.definition}</p>
                    {t.related && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {t.related.map((slug) => (
                          <Link
                            key={slug}
                            to="/breathwork/techniques/$slug"
                            params={{ slug }}
                            className="text-xs text-cyan-glow"
                          >
                            → {slug}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faq.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="quest-panel-air rounded-2xl border-0 px-5"
            >
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">For Practitioners</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Class plan: 60-min foundational session (PDF)",
            "Trauma-informed intake form (PDF)",
            "Coherent breathing handout (PDF)",
          ].map((label) => (
            <button
              key={label}
              onClick={() => alert("Download simulated.")}
              className="quest-panel-air rounded-2xl p-4 text-left text-sm text-foreground hover:bg-secondary"
            >
              ⬇ {label}
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
