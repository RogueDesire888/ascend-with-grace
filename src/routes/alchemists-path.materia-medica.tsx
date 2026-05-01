import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { herbs, type Herb } from "@/lib/herbal-data";
import { useHerbalProgress } from "@/lib/herbal-progress";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/alchemists-path/materia-medica")({
  head: () => ({
    meta: [
      { title: "Materia Medica — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "60+ herb monographs with energetics, constituents, traditional and modern use, doses, contraindications, and sustainability.",
      },
    ],
  }),
  component: MateriaMedica,
});

function MateriaMedica() {
  const { progress, toggleMonograph } = useHerbalProgress();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const energetics = ["All", "warming", "cooling", "neutral"];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return herbs.filter((h) => {
      if (filter !== "All" && h.energetics.temperature !== filter) return false;
      if (!term) return true;
      return (
        h.name.toLowerCase().includes(term) ||
        h.latin.toLowerCase().includes(term) ||
        h.actions.some((a) => a.toLowerCase().includes(term)) ||
        h.affinities.some((a) => a.toLowerCase().includes(term))
      );
    });
  }, [q, filter]);

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Materia Medica</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          {herbs.length} monographs — every herb with its energetic signature, key constituents,
          traditional &amp; modern use, dose ranges, contraindications, and harvest notes.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, action, or system…"
            className="w-full rounded-full border border-border/60 bg-card/50 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {energetics.map((e) => (
            <button
              key={e}
              onClick={() => setFilter(e)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
                filter === e
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/60 bg-card/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {herbs.length}.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <HerbCard
            key={h.slug}
            h={h}
            studied={!!progress.monographsStudied[h.slug]}
            onToggle={() => toggleMonograph(h.slug)}
          />
        ))}
      </ul>
    </article>
  );
}

function HerbCard({
  h,
  studied,
  onToggle,
}: {
  h: Herb;
  studied: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:bg-card/60">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link
            to="/alchemists-path/materia-medica/$slug"
            params={{ slug: h.slug }}
            className="block"
          >
            <p className="text-base font-semibold text-foreground hover:text-leaf-glow">{h.name}</p>
            <p className="text-xs italic text-muted-foreground">{h.latin}</p>
          </Link>
        </div>
        <Checkbox checked={studied} onCheckedChange={onToggle} aria-label="Mark studied" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <Tag>{h.energetics.temperature}</Tag>
        <Tag>{h.energetics.moisture}</Tag>
        <Tag>{h.energetics.tone}</Tag>
      </div>
      <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">
        {h.actions.slice(0, 4).join(" · ")}
      </p>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[0.65rem] capitalize text-muted-foreground">
      {children}
    </span>
  );
}
