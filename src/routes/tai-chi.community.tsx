import { createFileRoute } from "@tanstack/react-router";
import { teachers, events, faq, styles } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/community")({
  head: () => ({
    meta: [
      { title: "Community & Teachers — Tai Chi | Ascend" },
      { name: "description", content: "Lineages, finding a teacher, etiquette, and global Tai Chi events." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Community</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Community & Teachers</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi is an oral tradition. The internet has never replaced sitting with a teacher who can
          adjust your stance with a fingertip.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Finding a teacher</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Ask which lineage they trace to and how many years they trained with their teacher.</li>
          <li>• Watch a class before joining — does the teacher correct alignment, or just lead along?</li>
          <li>• Beginner-friendly teachers can articulate the 10 Essentials in plain language.</li>
          <li>• Workshops with senior masters once or twice a year supplement weekly local practice.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Major lineages today</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {styles.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-bold text-foreground">{s.id} Style</p>
              <p className="text-xs text-orchid-glow">{s.founder}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.story}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Major masters</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-orchid-glow">{t.style} · {t.era}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.contribution}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Events & gatherings</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {events.map((e) => (
            <div key={e.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-semibold text-foreground">{e.name}</p>
              <p className="text-xs text-orchid-glow">{e.when} · {e.where}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">FAQ</h2>
        <div className="mt-5 space-y-3">
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
