import { createFileRoute, Link } from "@tanstack/react-router";
import { anatomyTopics, allStudies } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/anatomy")({
  head: () => ({
    meta: [
      { title: "Anatomy & Biomechanics — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "How Tai Chi works in the body: kua, spinal spirals, fascia, foot tripod, vagal tone, vestibular training, and the eccentric quad load behind falls prevention.",
      },
    ],
  }),
  component: AnatomyPage,
});

function AnatomyPage() {
  const stats = [
    { n: "55%", label: "fall reduction (Wolf 1996, FICSIT)" },
    { n: "7 mmHg", label: "average systolic BP drop" },
    { n: "26", label: "bones per foot — the tripod" },
    { n: "~6 / min", label: "Tai Chi breath rate (resonance)" },
  ];

  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Body</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
          Anatomy & Biomechanics
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi works because it loads the body in a way few other practices do — slow,
          eccentric, rotational, breath-coupled, and balance-saturated. Understanding what is
          actually moving turns a form from choreography into therapy.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {stats.map((s) => (
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

      <section>
        <h2 className="text-2xl font-bold text-foreground">The body under the form</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Eight regions and systems carry most of Tai Chi's therapeutic load. Knowing them
          changes what you feel — and stops the hidden errors that turn good practice into knee pain.
        </p>
        <div className="mt-6 space-y-4">
          {anatomyTopics.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <h3 className="text-lg font-bold text-foreground">{t.region}</h3>
              <p className="mt-1 text-sm italic text-orchid-glow">{t.why}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t.detail}</p>
              <ul className="mt-3 space-y-1 text-sm text-foreground">
                {t.cues.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
              {t.research && (
                <p className="mt-3 text-xs italic text-muted-foreground">
                  Research note: {t.research}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Why slow, soft, and eccentric matters</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Most exercise prescriptions chase peak intensity. Tai Chi does the opposite: it asks the
          neuromuscular system to perform sub-maximal work for prolonged periods under perfect
          alignment. This is the load profile that:
        </p>
        <ul className="mt-3 space-y-1 text-sm text-foreground">
          <li>• Strengthens tendons and connective tissue (which respond to time, not force)</li>
          <li>• Trains balance via thousands of micro-corrections per session</li>
          <li>• Activates parasympathetic regulation through breath-paced movement</li>
          <li>• Develops fascial glide, the substrate of whole-body coordination</li>
          <li>• Avoids the joint-shear that injures aging and rehabilitating bodies</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">A few of the studies that matter</h2>
        <ul className="mt-4 space-y-3">
          {allStudies
            .filter((s) =>
              ["balance", "knee-osteoarthritis", "blood-pressure", "general"].includes(s.category),
            )
            .slice(0, 6)
            .map((s) => (
              <li
                key={s.id}
                className="rounded-2xl border border-border/50 bg-card/40 p-4"
              >
                <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                  {s.category} · {s.year}
                </p>
                <p className="mt-1 font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.authors} · {s.journal}</p>
                <p className="mt-2 text-sm text-foreground/90">{s.outcome}</p>
              </li>
            ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link to="/tai-chi/science" className="text-orchid-glow underline">
            → Full research library
          </Link>
        </p>
      </section>
    </article>
  );
}
