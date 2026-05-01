import { createFileRoute } from "@tanstack/react-router";
import { actions, constituentClasses, studies } from "@/lib/herbal-data";
import { Beaker, BookOpen, Microscope } from "lucide-react";

export const Route = createFileRoute("/alchemists-path/science")({
  head: () => ({
    meta: [
      { title: "Phytochemistry & Science — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Herbal actions, constituent classes, and peer-reviewed research — the bridge between green knowledge and the lab bench.",
      },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Phytochemistry &amp; Science</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Plants make medicine because they make molecules. This is the language linking the field
          to the lab — actions herbs perform, the constituent classes that perform them, and what
          good evidence currently says.
        </p>
      </header>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
          <BookOpen className="h-5 w-5 text-leaf-glow" /> Herbal Actions ({actions.length})
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold capitalize text-foreground">{a.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.definition}</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-leaf-glow">
                e.g. {a.exemplars.slice(0, 3).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
          <Beaker className="h-5 w-5 text-leaf-glow" /> Constituent Classes
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {constituentClasses.map((c) => (
            <li key={c.klass} className="rounded-xl border border-border/50 bg-card/40 p-4">
              <p className="text-base font-bold text-foreground">{c.klass}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
          <Microscope className="h-5 w-5 text-leaf-glow" /> Peer-Reviewed Findings
        </h2>
        <ul className="space-y-3">
          {studies.map((s) => (
            <li key={s.id} className="rounded-xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-leaf-glow">
                {s.journal} · {s.year}
              </p>
              <p className="mt-1 font-semibold text-foreground">{s.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.finding}</p>
              <p className="mt-2 text-xs italic text-muted-foreground">Dose used: {s.dosing}</p>
              <p className="mt-2 rounded-md bg-leaf-glow/10 px-3 py-2 text-sm text-foreground">
                <span className="font-semibold">Bottom line — </span>
                {s.bottomLine}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
