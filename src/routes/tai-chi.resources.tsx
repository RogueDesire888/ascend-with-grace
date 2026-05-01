import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tai-chi/resources")({
  head: () => ({
    meta: [
      { title: "Resource Hub — Tai Chi | Ascend" },
      { name: "description", content: "Books, films, and online resources for serious Tai Chi study." },
    ],
  }),
  component: ResourcesPage,
});

const books = [
  { title: "The Essence and Applications of Taijiquan", author: "Yang Chengfu (1934)", note: "Foundational text — contains the 10 Essentials and the original Yang form descriptions." },
  { title: "Cheng Tzu's Thirteen Treatises on T'ai Chi Ch'uan", author: "Cheng Man-ch'ing", note: "Lucid theoretical writing from the master who brought Tai Chi to the West." },
  { title: "Chen Style Taijiquan: The Source", author: "Chen Xiaowang", note: "Definitive Chen-style reference from the 19th-generation lineage holder." },
  { title: "The Tai Chi Classics", author: "Translated by Waysun Liao", note: "Accessible English translation of the canonical classical texts." },
  { title: "Tai Chi Classics", author: "Translated by Yang Jwing-Ming", note: "Scholarly translation with extensive commentary." },
  { title: "The Harvard Medical School Guide to Tai Chi", author: "Peter Wayne, PhD", note: "The most credible Western synthesis of research and practice." },
];

const online = [
  { name: "Taijiquan Journal", url: "https://taijiquan-journal.com", note: "English-language scholarship and lineage histories." },
  { name: "International Wushu Federation", url: "https://www.iwuf.org", note: "Standardized competition forms and global events." },
  { name: "Chen Village (Chenjiagou) International", url: "https://www.chenjiagou.net", note: "Pilgrimage and study at the source." },
  { name: "Wayne et al. Tai Chi research lab (Harvard)", url: "https://oshercenter.org", note: "Latest peer-reviewed Tai Chi research." },
];

function ResourcesPage() {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Library</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Resource Hub</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The shelf every serious Tai Chi student eventually builds. Begin with one book per tier of mastery.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Essential books</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {books.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-semibold text-foreground">{b.title}</p>
              <p className="text-xs text-orchid-glow">{b.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Online resources</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {online.map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border/50 bg-card/40 p-4 hover:border-primary/60">
              <p className="font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-orchid-glow">{r.url}</p>
              <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
            </a>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/start-here" className="text-orchid-glow underline">← Back to Start Here</Link>
      </p>
    </article>
  );
}
