import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/yoga/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — Yoga | Ascend" },
      { name: "description", content: "Your gateway into the yoga encyclopedia." },
    ],
  }),
  component: StartHere,
});

function StartHere() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Start Here</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Yoga is older than every modern wellness fashion put together. The word means union — and
          this is your map to the territory: asanas, philosophy, breath, anatomy, and the lifelong
          path of practice.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <Card
          to="/yoga/asanas"
          title="Asana Library"
          desc="32+ poses with Sanskrit names, alignment cues, contraindications, and modifications."
        />
        <Card
          to="/yoga/philosophy"
          title="Philosophy & History"
          desc="The 8 limbs of Patanjali, the major texts, and the eight living traditions."
        />
        <Card
          to="/yoga/goals"
          title="Yoga by Goal"
          desc="Curated sequences for back pain, anxiety, sleep, strength, focus, and more."
        />
        <Card
          to="/yoga/mastery"
          title="The Path to Mastery"
          desc="A belt system from White to Black, with 21- and 30-day challenges."
        />
        <Card
          to="/yoga/anatomy"
          title="Anatomy & Therapy"
          desc="What actually moves in each pose, and how research backs the practice."
        />
        <Card
          to="/yoga/tools"
          title="Practice Builder"
          desc="Build your own sequence, hold timer, and journal."
        />
      </section>

      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-xl font-bold text-foreground">First seven days</h2>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>1. Day 1 — read the 8 limbs (Philosophy).</li>
          <li>2. Day 2 — practice cat–cow, child's pose, downward dog. Five breaths each.</li>
          <li>3. Day 3 — add Warrior I and II. Hold for five breaths each side.</li>
          <li>4. Day 4 — three rounds of sun salutations.</li>
          <li>5. Day 5 — try a Goal sequence (start with anxiety or sleep).</li>
          <li>6. Day 6 — explore one tradition that calls you.</li>
          <li>7. Day 7 — savasana for ten minutes. Rest is practice.</li>
        </ol>
      </section>
    </article>
  );
}

function Card({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to as never}
      className="quest-panel-air block rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
    >
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
