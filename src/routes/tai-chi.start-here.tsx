import { createFileRoute, Link } from "@tanstack/react-router";
import { taiChiItems } from "@/components/platform/data";

export const Route = createFileRoute("/tai-chi/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — Tai Chi | Ascend" },
      { name: "description", content: "Orientation to the Tai Chi encyclopedia and a 7-day onboarding path." },
    ],
  }),
  component: StartHere,
});

const week = [
  { day: 1, focus: "Stand in Wu Ji for 5 minutes. Notice the breath.", goto: { label: "Read about Wu Ji", to: "/tai-chi/postures/$slug", params: { slug: "wu-ji" } } },
  { day: 2, focus: "Learn the Opening of Tai Chi. Practice 10 reps.", goto: { label: "Opening", to: "/tai-chi/postures/$slug", params: { slug: "tai-chi-opening" } } },
  { day: 3, focus: "Add Grasp Sparrow's Tail — the four energies.", goto: { label: "Grasp Sparrow's Tail", to: "/tai-chi/postures/$slug", params: { slug: "grasp-sparrows-tail" } } },
  { day: 4, focus: "Learn Single Whip. Practice the transition from yesterday.", goto: { label: "Single Whip", to: "/tai-chi/postures/$slug", params: { slug: "single-whip" } } },
  { day: 5, focus: "Add Cloud Hands. Step laterally without crossing feet.", goto: { label: "Cloud Hands", to: "/tai-chi/postures/$slug", params: { slug: "cloud-hands" } } },
  { day: 6, focus: "Learn the 13 Postures (8 energies + 5 steps).", goto: { label: "Principles", to: "/tai-chi/principles" as const } },
  { day: 7, focus: "Read the Tai Chi Treatise. Sit with one passage.", goto: { label: "Classics", to: "/tai-chi/principles" as const } },
];

function StartHere() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Begin</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Welcome to the Tai Chi Encyclopedia</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Tai Chi (太極) is a 350-year-old internal martial art that has become one of the most-studied
          movement practices in modern medicine. This encyclopedia is your map: postures, forms, family
          lineages, classical theory, peer-reviewed research, and an interactive practice builder.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {taiChiItems.slice(1).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/60 hover:bg-card/60"
          >
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Your first 7 days</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          A guided onboarding. Each day takes 10–20 minutes. Repeat the week as many times as you like —
          mastery in Tai Chi is built by returning to the basics, not by leaving them behind.
        </p>
        <ol className="mt-5 space-y-3">
          {week.map((d) => (
            <li key={d.day} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">Day {d.day}</p>
              <p className="mt-1 text-foreground">{d.focus}</p>
              <Link
                to={d.goto.to as never}
                params={(d.goto as { params?: Record<string, string> }).params as never}
                className="mt-2 inline-block text-sm text-orchid-glow underline"
              >
                → {d.goto.label}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
