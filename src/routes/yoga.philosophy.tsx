import { createFileRoute } from "@tanstack/react-router";
import { eightLimbs, traditions, sacredTexts, chakras } from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/philosophy")({
  head: () => ({
    meta: [
      { title: "Philosophy & History — Yoga | Ascend" },
      { name: "description", content: "The 8 limbs, sacred texts, traditions, and chakras." },
    ],
  }),
  component: Philosophy,
});

function Philosophy() {
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Philosophy & History</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The map under the postures. Read these once and the whole practice rearranges itself.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">The Eight Limbs of Patanjali</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {eightLimbs.map((l) => (
            <div key={l.id} className="quest-panel-air rounded-2xl p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">Limb {l.number}</p>
              <h3 className="text-lg font-bold text-foreground">{l.sanskrit}</h3>
              <p className="text-sm italic text-muted-foreground">{l.english}</p>
              <p className="mt-2 text-sm text-muted-foreground">{l.description}</p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {l.practices.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Living Traditions</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {traditions.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.founder} · {t.era}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
              <p className="mt-2 text-xs"><span className="text-orchid-glow">Pace:</span> {t.pace} · <span className="text-orchid-glow">Heat:</span> {t.heat}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">{t.philosophy}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Sacred Texts</h2>
        <div className="space-y-3">
          {sacredTexts.map((t) => (
            <div key={t.title} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="text-lg font-bold text-foreground">{t.title}{t.sanskritTitle && <span className="ml-2 italic text-orchid-glow">({t.sanskritTitle})</span>}</h3>
              <p className="text-xs text-muted-foreground">{t.author} · {t.era}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">{t.whyItMatters}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">The Seven Chakras</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {chakras.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">Chakra {c.number}</p>
              <h3 className="text-lg font-bold text-foreground">{c.sanskrit}</h3>
              <p className="text-sm italic text-muted-foreground">{c.english} · {c.color}</p>
              <p className="mt-2 text-xs"><span className="text-orchid-glow">Element:</span> {c.element}</p>
              <p className="text-xs"><span className="text-orchid-glow">Bija:</span> {c.bija}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.governs}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
