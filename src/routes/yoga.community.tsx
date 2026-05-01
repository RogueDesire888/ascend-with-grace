import { createFileRoute } from "@tanstack/react-router";
import { teachers } from "@/lib/yoga-data";

export const Route = createFileRoute("/yoga/community")({
  head: () => ({
    meta: [
      { title: "Community & Teachers — Yoga | Ascend" },
      { name: "description", content: "The lineage of modern yoga." },
    ],
  }),
  component: Community,
});

function Community() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Community & Teachers</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The teachers who shaped what we practice today. Every modern style traces back to a small
          number of 20th-century lineage holders.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Lineage Holders</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border/50 bg-card/40 p-5">
              <h3 className="font-bold text-foreground">{t.name}</h3>
              <p className="text-xs text-orchid-glow">{t.lineage} · {t.era}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.contribution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-xl font-bold text-foreground">Finding your teacher</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Look for at least a 200hr Yoga Alliance certification — preferably 500hr for advanced work.</li>
          <li>• Ask which lineage they trained in. A teacher who can name their teacher's teacher is a good sign.</li>
          <li>• Try several. The best teacher for your body and your stage of life is the one you keep showing up for.</li>
          <li>• Beware of cults of personality. The teaching matters more than the teacher.</li>
        </ul>
      </section>
    </article>
  );
}
