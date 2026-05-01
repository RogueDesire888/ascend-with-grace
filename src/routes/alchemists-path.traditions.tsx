import { createFileRoute } from "@tanstack/react-router";
import { traditionEntries } from "@/lib/herbal-data";

export const Route = createFileRoute("/alchemists-path/traditions")({
  head: () => ({
    meta: [
      { title: "Traditions — The Alchemist's Path | Ascend" },
      {
        name: "description",
        content:
          "World herbal traditions side by side: Western, Wise Woman, Eclectic, TCM, Ayurveda, Unani, Spagyric.",
      },
    ],
  }),
  component: TraditionsPage,
});

function TraditionsPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Living Traditions</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Herbalism is not one tradition — it is a chord of many. Each plays the same questions in
          a different key.
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {traditionEntries.map((t) => (
          <li
            key={t.id}
            className="rounded-3xl border border-border/50 bg-card/40 p-6"
          >
            <h2 className="text-xl font-bold text-foreground">{t.id}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
