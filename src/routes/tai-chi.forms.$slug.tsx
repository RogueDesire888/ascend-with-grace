import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { forms, getForm, getPostureName, styles as styleEntries } from "@/lib/tai-chi-data";

export const Route = createFileRoute("/tai-chi/forms/$slug")({
  head: ({ params }) => {
    const f = getForm(params.slug);
    return {
      meta: [
        { title: f ? `${f.name} — Ascend` : "Form — Ascend" },
        { name: "description", content: f?.why ?? "Tai Chi form detail." },
      ],
    };
  },
  loader: ({ params }) => {
    const form = getForm(params.slug);
    if (!form) throw notFound();
    return { form };
  },
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
      <p>Form not found.</p>
      <Link to="/tai-chi/forms" className="mt-3 inline-block text-orchid-glow underline">
        All forms
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/50 p-6">{error.message}</div>
  ),
  component: FormDetail,
});

function FormDetail() {
  const data = Route.useLoaderData() as { form: NonNullable<ReturnType<typeof getForm>> };
  const { form } = data;
  const styleEntry = styleEntries.find((s) => s.id === form.style);
  const related = forms
    .filter((f) => f.slug !== form.slug && f.style === form.style)
    .slice(0, 3);

  return (
    <article className="space-y-10">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">
          {form.style} · {form.level} · {form.postureCount} postures · {form.durationMinutes} min
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">{form.name}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">{form.why}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { n: form.postureCount.toString(), label: "postures" },
          { n: form.durationMinutes, label: "minutes" },
          { n: form.level, label: "level" },
          { n: form.style, label: "family" },
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

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          History
        </h3>
        <p className="text-sm text-muted-foreground">{form.history}</p>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Opening sequence
        </h3>
        <p className="mb-4 text-xs italic text-muted-foreground">
          The first {form.ideaSequence.length} postures. Memorize this section before progressing.
        </p>
        <ol className="space-y-2 text-sm">
          {form.ideaSequence.map((s, i) => (
            <li key={s + i}>
              <Link
                to="/tai-chi/postures/$slug"
                params={{ slug: s }}
                className="text-foreground hover:text-orchid-glow"
              >
                {i + 1}. {getPostureName(s)}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
          Signature postures
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">
          The movements that give this form its character. Spend extra time on each.
        </p>
        <div className="flex flex-wrap gap-2">
          {form.signaturePostures.map((s) => (
            <Link
              key={s}
              to="/tai-chi/postures/$slug"
              params={{ slug: s }}
              className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground hover:border-primary/60"
            >
              {getPostureName(s)}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Best for
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {form.bestFor.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            Recommended dosage
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong className="text-foreground">Learning phase:</strong> 4–6 weeks, 4×/week, opening sequence only.</li>
            <li>• <strong className="text-foreground">Memorization:</strong> 6–12 weeks, daily, full sequence at slow tempo.</li>
            <li>• <strong className="text-foreground">Refinement:</strong> indefinite, daily, applying one of the 10 Essentials at a time.</li>
            <li>• <strong className="text-foreground">Maintenance:</strong> 5–7 minutes daily forever.</li>
          </ul>
        </div>
      </section>

      {styleEntry && (
        <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">
            About {form.style} style
          </h3>
          <p className="text-sm text-muted-foreground">{styleEntry.story}</p>
          <ul className="mt-3 space-y-1 text-sm text-foreground">
            {styleEntry.characteristics.slice(0, 3).map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-foreground">More {form.style} forms</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/tai-chi/forms/$slug"
                params={{ slug: r.slug }}
                className="rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/60"
              >
                <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                  {r.level} · {r.durationMinutes} min
                </p>
                <p className="mt-1 font-semibold text-foreground">{r.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link to="/tai-chi/forms" className="inline-block text-sm text-orchid-glow underline">
        ← All forms
      </Link>
    </article>
  );
}
