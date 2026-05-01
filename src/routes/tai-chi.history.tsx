import { createFileRoute, Link } from "@tanstack/react-router";
import { styles, teachers, timeline } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/history")({
  head: () => ({
    meta: [
      { title: "History & Lineage — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "From a single village in Henan to 250 million practitioners — the origin of Tai Chi, the five family styles, and the masters who carried the art forward.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <article className="space-y-14">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Lineage</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">History & Lineage</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          From a single village in Henan to 250 million practitioners worldwide. The story of
          Tai Chi is the story of an oral tradition surviving four centuries and crossing into
          modern medicine.
        </p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">The origin question</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Two stories sit on top of each other. The mythic origin places Tai Chi with the
          12th-century Daoist immortal{" "}
          <strong className="text-foreground">Zhang Sanfeng</strong>, who is said to have
          observed a snake and a crane fighting on Wudang Mountain and intuited the principle
          that softness defeats hardness. The historical record begins later — in the
          mid-17th century at Chen Village (<em>Chenjiagou</em>) in Henan province, where{" "}
          <strong className="text-foreground">Chen Wangting (c. 1600–1680)</strong>, a retired
          Ming-dynasty military officer, synthesized battlefield techniques, Daoist breathing,
          and traditional Chinese medicine into the system from which all later Tai Chi
          descends.
        </p>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Most contemporary scholars treat Zhang Sanfeng as a literary attribution and Chen
          Wangting as the historical founder. Both stories matter: the myth tells us what Tai
          Chi <em>aspires</em> to; the history tells us where it actually came from.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Timeline</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Eight inflection points that took Tai Chi from a closed family art to a global
          medicine.
        </p>
        <ol className="mt-5 space-y-3">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-sm font-semibold text-orchid-glow">{t.year}</p>
              <p className="mt-1 text-foreground">{t.event}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.significance}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">The five family styles</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Every modern Tai Chi school traces back to one of these five families. They share
          the same principles and the same 13 fundamental postures — what differs is tempo,
          frame size, expression of fa jin, and pedagogical emphasis.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {styles.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {s.era}
              </p>
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
              {s.signatureForms.length > 0 && (
                <p className="mt-2 text-xs">
                  Signature forms:{" "}
                  {s.signatureForms.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 && ", "}
                      <Link
                        to="/tai-chi/forms/$slug"
                        params={{ slug }}
                        className="text-orchid-glow underline"
                      >
                        {slug}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Globalization (1956 → today)</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-orchid-glow">1956</p>
            <p className="mt-2 text-muted-foreground">
              The PRC Sports Commission releases the Yang 24 form — the first standardized,
              universally-teachable version. Tai Chi enters Chinese public health.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-orchid-glow">1964</p>
            <p className="mt-2 text-muted-foreground">
              Cheng Man-ch'ing arrives in New York. The first sustained transmission of Tai
              Chi to the West begins.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-orchid-glow">2010s</p>
            <p className="mt-2 text-muted-foreground">
              The <em>New England Journal of Medicine</em> publishes RCTs on Tai Chi for
              fibromyalgia (Wang 2010) and Parkinson's (Li 2012) — Western medical legitimacy
              arrives.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Key masters</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The names every serious student eventually learns. A bow of recognition.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-orchid-glow">
                {t.style} · {t.era}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.contribution}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/community" className="text-orchid-glow underline">
          → Find a teacher and lineage today
        </Link>
      </p>
    </article>
  );
}
