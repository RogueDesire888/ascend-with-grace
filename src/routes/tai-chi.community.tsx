import { createFileRoute, Link } from "@tanstack/react-router";
import { teachers, events, faq, styles, ethics } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/community")({
  head: () => ({
    meta: [
      { title: "Community & Teachers — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Lineages, finding a teacher, traditional etiquette, baishi discipleship, and global Tai Chi events.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Community</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
          Community & Teachers
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Tai Chi is an oral, hands-on tradition. The internet has never replaced sitting with
          a teacher who can adjust your stance with a fingertip — and probably never will.
        </p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">Finding a teacher — a checklist</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Use this whether you're attending a free park class or paying a monthly studio fee.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            • <strong className="text-foreground">Ask which lineage they trace to.</strong> A
            real teacher names their teacher, and their teacher's teacher, without hesitation.
          </li>
          <li>
            • <strong className="text-foreground">Ask how long they trained with their teacher.</strong>{" "}
            The honest answer is decades.
          </li>
          <li>
            • <strong className="text-foreground">Watch a class before joining.</strong> Does
            the teacher correct individual alignment, or just lead a class along?
          </li>
          <li>
            • <strong className="text-foreground">Listen for plain-language mastery of the 10 Essentials.</strong>{" "}
            If they can't articulate them, they cannot teach them.
          </li>
          <li>
            • <strong className="text-foreground">Notice how they handle push hands.</strong>{" "}
            Issuing for ego is the surest sign of a teacher to avoid.
          </li>
          <li>
            • <strong className="text-foreground">Look at their senior students' bodies.</strong>{" "}
            Long-term students of a good teacher move well. Long-term students of a bad
            teacher carry that teacher's tensions.
          </li>
          <li>
            • <strong className="text-foreground">Workshops with senior masters once or twice a year</strong>{" "}
            supplement weekly local practice.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Etiquette & traditional ethics</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Every serious school operates inside an unwritten code. Knowing it makes the
          difference between being a tourist and being a student.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {ethics.map((e) => (
            <article
              key={e.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-5"
            >
              <h3 className="font-bold text-foreground">{e.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="text-orchid-glow">What: </span>
                {e.what}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="text-orchid-glow">Why: </span>
                {e.why}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-2xl font-bold text-foreground">In-person vs. online study</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2 text-sm">
          <div>
            <p className="font-semibold text-foreground">In-person — irreplaceable for</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>• Push hands and partner work (impossible to fake online)</li>
              <li>• Alignment corrections through touch</li>
              <li>• Calibration of effort and song</li>
              <li>• The somatic transmission that turns shape into substance</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Online — useful for</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>• Memorizing form sequence between in-person sessions</li>
              <li>• Lineage history, theory, classical study</li>
              <li>• Access to senior teachers in other cities</li>
              <li>• Daily companion practice when no local teacher exists</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Recommendation: even one in-person workshop per year transforms an online practice.
          Travel for it if you must.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Major lineages today</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {styles.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-bold text-foreground">{s.id} Style</p>
              <p className="text-xs text-orchid-glow">{s.founder}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.story}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Major masters</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {teachers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-orchid-glow">
                {t.style} · {t.era}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.contribution}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">Events & gatherings</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {events.map((e) => (
            <div
              key={e.name}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <p className="font-semibold text-foreground">{e.name}</p>
              <p className="text-xs text-orchid-glow">
                {e.when} · {e.where}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">FAQ</h2>
        <div className="mt-5 space-y-3">
          {faq.map((f, i) => (
            <details
              key={i}
              className="rounded-2xl border border-border/50 bg-card/40 p-4"
            >
              <summary className="cursor-pointer font-semibold text-foreground">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="text-sm">
        <Link to="/tai-chi/resources" className="text-orchid-glow underline">
          → Books, films, and journals (Resource Hub)
        </Link>
      </p>
    </article>
  );
}
