import { createFileRoute } from "@tanstack/react-router";
import { teachers, schools } from "@/lib/herbal-data";

export const Route = createFileRoute("/alchemists-path/community")({
  head: () => ({
    meta: [
      { title: "Community & Teachers — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Living teachers, schools, lineages — where to find apprenticeships, courses, and study circles.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Community &amp; Teachers</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Books and websites only take you so far. Find a teacher, a circle, or a school. The plants
          are best learned in good company.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Living Teachers</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <li key={t.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-base font-semibold text-foreground">{t.name}</p>
              <p className="text-xs uppercase tracking-widest text-leaf-glow">{t.lineage}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.knownFor}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">Read: {t.book}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Schools</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {schools.map((s) => (
            <li key={s.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-base font-semibold text-foreground">{s.name}</p>
              <p className="text-xs uppercase tracking-widest text-leaf-glow">{s.format} · est. {s.founded}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.focus}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">{s.notable}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
