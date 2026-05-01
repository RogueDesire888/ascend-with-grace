import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Wind } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { breathworkItems } from "@/components/platform/data";
import { searchAll, type SearchHit } from "@/lib/breathwork-data";
import { useBreathProgress, currentBelt } from "@/lib/breathwork-progress";

export const Route = createFileRoute("/breathwork")({
  head: () => ({
    meta: [
      { title: "Breathwork — Ascend" },
      {
        name: "description",
        content:
          "An interactive encyclopedia of breathwork: techniques, science, mastery path, community, and tools.",
      },
    ],
  }),
  component: BreathworkLayout,
});

function BreathworkLayout() {
  const location = useLocation();
  const isRoot = location.pathname === "/breathwork" || location.pathname === "/breathwork/";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/breathwork/start-here" className="inline-flex items-center gap-2">
          <Wind className="h-5 w-5 text-cyan-glow" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Breathwork
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <BeltDisplay />
          <BreathSearch />
        </div>
      </div>

      <nav className="scrollbar-none mb-8 flex gap-2 overflow-x-auto pb-2">
        {breathworkItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="shrink-0 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            activeProps={{ className: "border-primary bg-primary/15 text-foreground" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {isRoot ? <RootRedirect /> : <Outlet />}
    </div>
  );
}

function RootRedirect() {
  // simple message; nav above gets users moving
  return (
    <div className="rounded-3xl border border-border/50 bg-card/40 p-10 text-center">
      <h1 className="text-3xl font-bold text-foreground">The Breath Encyclopedia</h1>
      <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
        Choose a section above. New here? Begin with{" "}
        <Link to="/breathwork/start-here" className="text-cyan-glow underline">
          Start Here
        </Link>
        .
      </p>
    </div>
  );
}

function BeltDisplay() {
  const { progress } = useBreathProgress();
  const { current, phaseCount, techCount } = currentBelt(progress);
  return (
    <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs sm:inline-flex">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: current.color, boxShadow: `0 0 12px ${current.color}` }}
      />
      <span className="font-semibold text-foreground">{current.name}</span>
      <span className="text-muted-foreground">
        {phaseCount}/4 phases · {techCount}/15 techniques
      </span>
    </div>
  );
}

function BreathSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setHits(searchAll(q));
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary">
          <Search className="h-3.5 w-3.5" />
          Search breathwork
          <kbd className="ml-1 hidden rounded border border-border/60 px-1 text-[0.6rem] sm:inline">
            ⌘K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Search the encyclopedia</DialogTitle>
        </DialogHeader>
        <input
          autoFocus
          placeholder="Try 'box breathing', 'cortisol', 'BOLT'…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="mt-3 max-h-80 overflow-y-auto">
          {hits.length === 0 && q.length > 1 && (
            <p className="text-sm text-muted-foreground">No matches. Try a different term.</p>
          )}
          <ul className="space-y-2">
            {hits.map((h, i) => (
              <li key={i}>
                <Link
                  to={h.href as never}
                  params={h.hrefParams as never}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-border/50 bg-background/40 p-3 hover:bg-secondary"
                >
                  <p className="text-[0.65rem] uppercase tracking-widest text-cyan-glow">
                    {h.kind}
                  </p>
                  <p className="font-semibold text-foreground">{h.title}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{h.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
