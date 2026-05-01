import { createFileRoute, Link } from "@tanstack/react-router";
import { getTechniqueName, traditions } from "@/lib/breathwork-data";

export const Route = createFileRoute("/breathwork/techniques/traditions")({
  head: () => ({
    meta: [
      { title: "Traditions — Breathwork | Ascend" },
      { name: "description", content: "Pranayama, Tibetan, Qigong, and modern therapeutic systems." },
    ],
  }),
  component: TraditionsPage,
});

function TraditionsPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Traditions</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Where these techniques come from — and how the lineages relate.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {traditions.map((t) => (
          <div key={t.id} className="quest-panel-air rounded-3xl p-6">
            <h2 className="text-xl font-bold text-foreground">{t.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.techniques.map((slug) => (
                <Link
                  key={slug}
                  to="/breathwork/techniques/$slug"
                  params={{ slug }}
                  className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs hover:bg-secondary"
                >
                  {getTechniqueName(slug)} →
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
