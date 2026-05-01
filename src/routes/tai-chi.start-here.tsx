import { createFileRoute, Link } from "@tanstack/react-router";
import { taiChiItems } from "@/components/platform/data";

export const Route = createFileRoute("/tai-chi/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Orientation to the Tai Chi encyclopedia: what Tai Chi actually is, the physiology behind it, three first practices, and a guided 7-day onboarding.",
      },
    ],
  }),
  component: StartHere,
});

const week = [
  {
    day: 1,
    focus: "Stand in Wu Ji for 5 minutes. Notice the breath.",
    goto: { label: "Read about Wu Ji", to: "/tai-chi/postures/$slug", params: { slug: "wu-ji" } },
  },
  {
    day: 2,
    focus: "Learn the Opening of Tai Chi. Practice 10 repetitions slowly.",
    goto: {
      label: "Opening",
      to: "/tai-chi/postures/$slug",
      params: { slug: "tai-chi-opening" },
    },
  },
  {
    day: 3,
    focus: "Add Grasp Sparrow's Tail — first taste of the four cardinal energies.",
    goto: {
      label: "Grasp Sparrow's Tail",
      to: "/tai-chi/postures/$slug",
      params: { slug: "grasp-sparrows-tail" },
    },
  },
  {
    day: 4,
    focus: "Learn Single Whip. Practice the transition from yesterday.",
    goto: {
      label: "Single Whip",
      to: "/tai-chi/postures/$slug",
      params: { slug: "single-whip" },
    },
  },
  {
    day: 5,
    focus: "Add Cloud Hands. Step laterally without crossing the feet.",
    goto: {
      label: "Cloud Hands",
      to: "/tai-chi/postures/$slug",
      params: { slug: "cloud-hands" },
    },
  },
  {
    day: 6,
    focus: "Read the 13 Postures (8 energies + 5 steps). Try to feel each one.",
    goto: { label: "Principles", to: "/tai-chi/principles" as const },
  },
  {
    day: 7,
    focus: "Read one passage from the Tai Chi Classics. Sit with it.",
    goto: { label: "Classics", to: "/tai-chi/principles" as const },
  },
];

function StartHere() {
  return (
    <article className="space-y-14">
      <header className="space-y-4">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Begin</p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          Welcome to the Tai Chi Encyclopedia
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Tai Chi (太極, <em>Taijiquan</em>) is a 350-year-old Chinese internal martial art that
          has become one of the most-studied movement practices in modern medicine. This
          encyclopedia is your map: postures, forms, family lineages, classical theory, peer-
          reviewed research, anatomy, ethics, and an interactive practice builder.
        </p>
        <p className="max-w-prose text-sm italic text-muted-foreground">
          Estimated 250+ million practitioners worldwide. The most-practiced martial art on
          Earth — and arguably the most evidence-based.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { n: "350+", label: "years of lineage" },
          { n: "5", label: "major family styles" },
          { n: "100+", label: "peer-reviewed RCTs" },
          { n: "6 / min", label: "breath rate (resonance)" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/50 bg-card/40 p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{s.n}</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/50 bg-card/40 p-6">
          <h2 className="text-xl font-bold text-foreground">What Tai Chi is</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• A complete <strong className="text-foreground">internal martial art</strong> with documented effectiveness against trained opponents.</li>
            <li>• A <strong className="text-foreground">somatic medicine</strong> with class-leading evidence for falls prevention, hypertension, anxiety, knee OA, and Parkinson's.</li>
            <li>• A <strong className="text-foreground">moving meditation</strong> that trains attention, breath, and presence under sustained low-grade physical demand.</li>
            <li>• A <strong className="text-foreground">philosophical practice</strong> rooted in Daoism, the I Ching, and Chinese medicine.</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-border/50 bg-card/40 p-6">
          <h2 className="text-xl font-bold text-foreground">What Tai Chi is not</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Not slow karate, not aerobic gymnastics, not stretching.</li>
            <li>• Not a religion — though it carries the philosophical fingerprint of Daoism.</li>
            <li>• Not learnable in weekends. Mastery is measured in decades; competence in years.</li>
            <li>• Not a substitute for a teacher's hands. This encyclopedia points you outward.</li>
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">The physiology in one breath</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Why does this practice work? Three converging mechanisms:
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm">
          <div className="rounded-xl border border-border/40 bg-background/40 p-4">
            <p className="text-xs uppercase tracking-widest text-orchid-glow">1. Vagal tone</p>
            <p className="mt-2 text-muted-foreground">
              Slow nasal breath at ≈6 cycles per minute is the resonance frequency of the
              cardiovascular system. HRV climbs measurably after 8 weeks.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-background/40 p-4">
            <p className="text-xs uppercase tracking-widest text-orchid-glow">2. Eccentric load</p>
            <p className="mt-2 text-muted-foreground">
              Every weight transfer is a 3–8 second eccentric quadriceps contraction — the
              hardest, most protective contraction the body can make.
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-background/40 p-4">
            <p className="text-xs uppercase tracking-widest text-orchid-glow">3. Vestibular drill</p>
            <p className="mt-2 text-muted-foreground">
              Single-leg postures, head turns, and slow weight shifts re-train the
              proprioceptive system that decays with age. Falls drop 47–55% in landmark RCTs.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link to="/tai-chi/anatomy" className="text-orchid-glow underline">
            → Full anatomy &amp; biomechanics
          </Link>
          <span className="mx-2 text-muted-foreground">·</span>
          <Link to="/tai-chi/science" className="text-orchid-glow underline">
            → Research library
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Three first practices</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Begin with these. Each takes minutes, asks for nothing, and gives you the entire
          architecture of the art in seed form.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Wu Ji standing",
              what: "5 minutes. Stand. Settle the breath. Drop the weight into the feet.",
              link: { to: "/tai-chi/postures/$slug" as const, params: { slug: "wu-ji" } },
            },
            {
              n: "02",
              title: "Tai Chi Opening",
              what: "Hands rise on the inhale, lower on the exhale. Ten cycles, slowly.",
              link: { to: "/tai-chi/postures/$slug" as const, params: { slug: "tai-chi-opening" } },
            },
            {
              n: "03",
              title: "Cloud Hands",
              what: "Lateral steps with the dantian leading. Five each direction.",
              link: { to: "/tai-chi/postures/$slug" as const, params: { slug: "cloud-hands" } },
            },
          ].map((p) => (
            <Link
              key={p.n}
              to={p.link.to}
              params={p.link.params}
              className="block rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/60"
            >
              <p className="text-xs uppercase tracking-widest text-orchid-glow">{p.n}</p>
              <p className="mt-1 text-lg font-bold text-foreground">{p.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.what}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Your first 7 days</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          A guided onboarding. Each day takes 10–20 minutes. Repeat the week as many times as
          you like — mastery in Tai Chi is built by returning to the basics, not by leaving
          them behind.
        </p>
        <ol className="mt-5 space-y-3">
          {week.map((d) => (
            <li key={d.day} className="rounded-2xl border border-border/50 bg-card/40 p-4">
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                Day {d.day}
              </p>
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

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">A small code of practice</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• <strong className="text-foreground">Quality over quantity.</strong> Five minutes of careful Wu Ji beats thirty minutes of sloppy form.</li>
          <li>• <strong className="text-foreground">Daily over weekly.</strong> A short practice every day compounds; a single long session does not.</li>
          <li>• <strong className="text-foreground">Find a teacher when you can.</strong> A real teacher's hand on your lumbar transmits what no video can.</li>
          <li>• <strong className="text-foreground">Push hands is a learning game, not a fight.</strong> Injury is failure. Ego is failure.</li>
          <li>• <strong className="text-foreground">Respect the lineage.</strong> Every adjustment you receive arrived through generations who paid for it.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Where to go from here</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {taiChiItems.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-2xl border border-border/50 bg-card/40 p-5 transition-colors hover:border-primary/60 hover:bg-card/60"
            >
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
