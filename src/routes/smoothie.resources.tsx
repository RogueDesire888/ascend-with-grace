import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/lib/smoothie-data";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/smoothie/resources")({
  head: () => ({
    meta: [
      { title: "Resources — The Smoothie Codex | Ascend" },
      { name: "description", content: "Foundational books, science references, and pantry guides." },
    ],
  }),
  component: ResourcesPage,
});

const channels = [
  { name: "NutritionFacts.org", topic: "Plant-forward research distilled by Dr Greger." },
  { name: "Examine.com", topic: "Unbiased supplement and ingredient evidence reviews." },
  { name: "USDA FoodData Central", topic: "The macro and micronutrient database that backs the codex." },
  { name: "Cronometer", topic: "Track your blends — full micronutrient breakdown, not just calories." },
];

function ResourcesPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Resource Hub</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Books, databases, and references that complement the codex without competing with it.
        </p>
      </header>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Books</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {books.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-primary">
                {b.level} · {b.year}
              </p>
              <p className="font-semibold text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Databases & references</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {channels.map((c) => (
            <div key={c.name} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="font-semibold text-foreground">{c.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.topic}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
