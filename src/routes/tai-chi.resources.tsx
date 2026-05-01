import { createFileRoute, Link } from "@tanstack/react-router";
import { films, podcasts, journals, glossary, tiers } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/resources")({
  head: () => ({
    meta: [
      { title: "Resource Hub — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Books, films, podcasts, journals, and a working glossary — the shelf every serious Tai Chi student eventually builds.",
      },
    ],
  }),
  component: ResourcesPage,
});

const books = [
  {
    title: "The Essence and Applications of Taijiquan",
    author: "Yang Chengfu (1934)",
    tier: "Beginner",
    note: "Foundational text — contains the 10 Essentials and the original Yang form descriptions.",
  },
  {
    title: "Cheng Tzu's Thirteen Treatises on T'ai Chi Ch'uan",
    author: "Cheng Man-ch'ing",
    tier: "Student",
    note: "Lucid theoretical writing from the master who brought Tai Chi to the West.",
  },
  {
    title: "Chen Style Taijiquan: The Source",
    author: "Chen Xiaowang",
    tier: "Practitioner",
    note: "Definitive Chen-style reference from the 19th-generation lineage holder.",
  },
  {
    title: "The Tai Chi Classics",
    author: "Translated by Waysun Liao",
    tier: "Beginner",
    note: "Accessible English translation of the canonical classical texts.",
  },
  {
    title: "Tai Chi Classics",
    author: "Translated by Yang Jwing-Ming",
    tier: "Adept",
    note: "Scholarly translation with extensive commentary.",
  },
  {
    title: "The Harvard Medical School Guide to Tai Chi",
    author: "Peter Wayne, PhD",
    tier: "Practitioner",
    note: "The most credible Western synthesis of research and practice.",
  },
  {
    title: "There Are No Secrets",
    author: "Wolfe Lowenthal",
    tier: "Student",
    note: "Memoir of training under Cheng Man-ch'ing — captures the texture of real transmission.",
  },
  {
    title: "The Power of Internal Martial Arts",
    author: "B.K. Frantzis",
    tier: "Adept",
    note: "Cross-style synthesis from a long-term Western adept of multiple internal arts.",
  },
];

const online = [
  {
    name: "Taijiquan Journal",
    url: "https://taijiquan-journal.com",
    note: "English-language scholarship and lineage histories.",
  },
  {
    name: "International Wushu Federation",
    url: "https://www.iwuf.org",
    note: "Standardized competition forms and global events.",
  },
  {
    name: "Chenjiagou (Chen Village) International",
    url: "https://www.chenjiagou.net",
    note: "Pilgrimage and study at the source.",
  },
  {
    name: "Harvard Osher Center — Tai Chi research",
    url: "https://oshercenter.org",
    note: "Latest peer-reviewed Tai Chi research from Wayne's lab.",
  },
];

function ResourcesPage() {
  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Library</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Resource Hub</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The shelf every serious Tai Chi student eventually builds. Books, films, podcasts,
          journals, and a working glossary. Begin with one book per tier of mastery.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">A shelf by tier</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          One book per tier is enough. Read it slowly, return to it for years.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {tiers.map((t) => {
            const book = books.find((b) => b.tier === t.name.split(" — ")[0]);
            if (!book) return null;
            return (
              <div
                key={t.id}
                className="rounded-2xl border border-border/50 bg-card/40 p-5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: t.color }}
                  />
                  <p className="text-xs uppercase tracking-widest text-orchid-glow">{t.name}</p>
                </div>
                <p className="mt-2 text-sm font-bold text-foreground">{book.title}</p>
                <p className="text-xs italic text-muted-foreground">{book.author}</p>
                <p className="mt-1 text-xs text-muted-foreground">{book.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Essential books</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {books.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                For {b.tier}s
              </p>
              <p className="mt-1 font-semibold text-foreground">{b.title}</p>
              <p className="text-xs italic text-muted-foreground">{b.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Films & documentaries</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {films.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold text-foreground">{f.title}</p>
              <p className="text-xs text-orchid-glow">
                {f.year} · {f.director}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Podcasts</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {podcasts.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold text-foreground">{p.title}</p>
              <p className="text-xs text-orchid-glow">{p.host}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Academic journals & ongoing study</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {journals.map((j) => (
            <a
              key={j.name}
              href={j.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:border-primary/60"
            >
              <p className="font-semibold text-foreground">{j.name}</p>
              <p className="text-xs text-orchid-glow">{j.url}</p>
              <p className="mt-2 text-sm text-muted-foreground">{j.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Online resources</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {online.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:border-primary/60"
            >
              <p className="font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-orchid-glow">{r.url}</p>
              <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Quick glossary</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The core vocabulary. Full definitions live on the{" "}
          <Link to="/tai-chi/principles" className="text-orchid-glow underline">
            Principles &amp; Classics
          </Link>{" "}
          page.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {glossary.map((g) => (
            <span
              key={g.term}
              className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground"
              title={g.short}
            >
              <strong>{g.term}</strong>{" "}
              <em className="text-muted-foreground">{g.pinyin}</em>
            </span>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/start-here" className="text-orchid-glow underline">
          ← Back to Start Here
        </Link>
      </p>
    </article>
  );
}
