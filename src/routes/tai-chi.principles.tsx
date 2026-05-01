import { createFileRoute, Link } from "@tanstack/react-router";
import {
  thirteenPostures,
  tenEssentials,
  classics,
  glossary,
  theoryYinYang,
  fiveElements,
  threeTreasures,
  dantianMap,
} from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/principles")({
  head: () => ({
    meta: [
      { title: "Principles & Classics — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Yin/yang, the 13 postures, three treasures, dantian map, Yang Chengfu's 10 Essentials, and excerpts from the Tai Chi Classics — with a working glossary.",
      },
    ],
  }),
  component: PrinciplesPage,
});

function YinYangSvg() {
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32" aria-hidden>
      <defs>
        <clipPath id="yy-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <g clipPath="url(#yy-clip)">
        <circle cx="50" cy="50" r="48" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50,2 a48,48 0 0,1 0,96 a24,24 0 0,1 0,-48 a24,24 0 0,0 0,-48" fill="currentColor" />
        <circle cx="50" cy="26" r="6" fill="hsl(var(--background))" />
        <circle cx="50" cy="74" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}

function PrinciplesPage() {
  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Theory</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
          Principles & Classics
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The internal map: yin/yang, the 13 fundamental postures, the three treasures, the
          dantian, the 10 Essentials of Yang Chengfu, and excerpts from the canonical Tai Chi
          Classics. Theory only matters because it changes what you feel.
        </p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="text-orchid-glow">
            <YinYangSvg />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{theoryYinYang.name}</h2>
            <p className="mt-1 text-sm italic text-orchid-glow">{theoryYinYang.short}</p>
            <p className="mt-3 max-w-prose text-sm text-muted-foreground">{theoryYinYang.long}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">
          The 13 Postures (8 energies + 5 steps)
        </h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The atomic vocabulary of Tai Chi. Every form is a sentence built from these
          characters. The 8 energies (jin) split into 4 cardinals (peng, lu, ji, an) and 4
          corners (cai, lie, zhou, kao); the 5 steps cover advance, retreat, left, right, and
          central equilibrium (zhong ding) — the silent 13th.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {thirteenPostures.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {e.category}
              </p>
              <p className="mt-1 font-bold text-foreground">
                {e.english} — {e.pinyin} ({e.chinese})
              </p>
              {e.direction && <p className="text-xs text-muted-foreground">{e.direction}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
              <p className="mt-1 text-xs italic text-orchid-glow">Felt: {e.felt}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">The Three Treasures</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Chinese internal arts work with three intertwined currencies — essence, vital
          breath, and spirit. Each has a body location, a way to cultivate it, and a way it
          gets depleted.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {threeTreasures.map((t) => (
            <article key={t.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="text-3xl font-bold text-orchid-glow">{t.chinese}</p>
              <p className="mt-1 text-lg font-bold text-foreground">{t.name}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                Locus
              </p>
              <p className="text-sm text-foreground">{t.locus}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                Cultivate by
              </p>
              <p className="text-sm text-muted-foreground">{t.cultivation}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-coral-glow">
                Depleted by
              </p>
              <p className="text-sm text-muted-foreground">{t.depletedBy}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">The Dantian Map</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Three energetic centers, vertically stacked. Tai Chi movement always originates from
          and returns to the lower dantian.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {dantianMap.map((d) => (
            <div key={d.id} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <p className="font-bold text-foreground">{d.name}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-orchid-glow">Location</p>
              <p className="text-sm text-muted-foreground">{d.location}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-orchid-glow">Function</p>
              <p className="text-sm text-muted-foreground">{d.function}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">The Five Elements</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Wu Xing (五行) is the relational map of Chinese medicine. Every Tai Chi style and
          every posture leans on one or more of the five elemental qualities.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {fiveElements.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-bold text-foreground">{f.element}</p>
              <p className="mt-2 text-xs text-muted-foreground">Organ: {f.organ}</p>
              <p className="text-xs text-muted-foreground">Movement: {f.movement}</p>
              <p className="text-xs text-muted-foreground">Emotion: {f.emotion}</p>
              <p className="mt-2 text-xs italic text-orchid-glow">{f.cultivates}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Yang Chengfu's 10 Essentials</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Recorded in the 1930s by Yang Chengfu's student Chen Weiming. The most-quoted
          single text in modern Tai Chi pedagogy. Every essential is a lifetime of work.
        </p>
        <ol className="mt-5 space-y-3">
          {tenEssentials.map((e) => (
            <li key={e.number} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-sm font-semibold text-orchid-glow">
                {e.number}. {e.english}
              </p>
              <p className="text-xs italic text-muted-foreground">{e.chinese}</p>
              <p className="mt-2 text-sm text-foreground">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">From the Classics</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The canonical theoretical writings of Tai Chi were stabilized in the 19th century
          and still set the bar today. Read each passage as a koan: short, precise, and
          designed to be returned to over years.
        </p>
        <div className="mt-5 space-y-4">
          {classics.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {c.era} · {c.attributedTo}
              </p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{c.title}</h3>
              <blockquote className="mt-3 border-l-2 border-orchid-glow pl-4 text-sm italic text-foreground">
                "{c.passage}"
              </blockquote>
              <p className="mt-2 text-sm text-muted-foreground">{c.commentary}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Glossary</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The internal vocabulary every serious student eventually learns. Pinyin first,
          characters where they help, with a short and a long definition.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {glossary.map((g) => (
            <details
              key={g.term}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <summary className="cursor-pointer">
                <span className="font-bold text-foreground">{g.term}</span>{" "}
                <span className="text-xs italic text-orchid-glow">
                  {g.pinyin} · {g.chinese}
                </span>
                <span className="ml-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {g.category}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">{g.short}</p>
              </summary>
              <p className="mt-2 text-sm text-foreground">{g.long}</p>
              {g.related && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Related: {g.related.join(", ")}
                </p>
              )}
            </details>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/anatomy" className="text-orchid-glow underline">
          → How these principles map onto the body (Anatomy)
        </Link>
      </p>
    </article>
  );
}
