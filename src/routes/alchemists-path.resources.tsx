import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/lib/herbal-data";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/alchemists-path/resources")({
  head: () => ({
    meta: [
      { title: "Resources — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "Essential reading, field guides, and references — the working library of a serious herbalist.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const grouped = books.reduce<Record<string, typeof books>>((acc, b) => {
    (acc[b.level] = acc[b.level] ?? []).push(b);
    return acc;
  }, {});

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Resource Hub</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          The shelf every working herbalist eventually owns. Start with one book per category and
          read it twice before adding another.
        </p>
      </header>

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-foreground">
            <BookOpen className="h-4 w-4 text-leaf-glow" /> {category}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-border/50 bg-card/40 p-4"
              >
                <p className="font-semibold text-foreground">{b.title}</p>
                <p className="text-xs italic text-muted-foreground">{b.author}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.why}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
