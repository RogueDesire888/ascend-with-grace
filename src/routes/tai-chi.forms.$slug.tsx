import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getForm, getPostureName } from "@/lib/tai-chi-data";

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
      <Link to="/tai-chi/forms" className="mt-3 inline-block text-orchid-glow underline">All forms</Link>
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
  return (
    <article className="space-y-8">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">
          {form.style} · {form.level} · {form.postureCount} postures · {form.durationMinutes} min
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">{form.name}</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">{form.why}</p>
      </header>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">History</h3>
        <p className="text-sm text-muted-foreground">{form.history}</p>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Opening sequence</h3>
        <ol className="space-y-2 text-sm">
          {form.ideaSequence.map((s, i) => (
            <li key={s + i}>
              <Link to="/tai-chi/postures/$slug" params={{ slug: s }} className="text-foreground hover:text-orchid-glow">
                {i + 1}. {getPostureName(s)}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-orchid-glow">Best for</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {form.bestFor.map((b) => <li key={b}>• {b}</li>)}
        </ul>
      </section>

      <Link to="/tai-chi/forms" className="inline-block text-sm text-orchid-glow underline">← All forms</Link>
    </article>
  );
}
