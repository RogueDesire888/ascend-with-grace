import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { asanas, getAsanaName } from "@/lib/yoga-data";
import { useYogaProgress } from "@/lib/yoga-progress";

export const Route = createFileRoute("/yoga/tools")({
  head: () => ({
    meta: [
      { title: "Practice Builder — Yoga | Ascend" },
      { name: "description", content: "Build sequences, count sun salutations, journal." },
    ],
  }),
  component: Tools,
});

function Tools() {
  const { progress, saveSequence, deleteSequence, addJournal, incrementSunSalutations } = useYogaProgress();
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const togglePick = (slug: string) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  const save = () => {
    if (!name.trim() || picked.length === 0) return;
    saveSequence({
      id: crypto.randomUUID(),
      name: name.trim(),
      steps: picked.map((slug) => ({
        slug,
        holdSeconds: asanas.find((a) => a.slug === slug)?.holdSeconds ?? 30,
      })),
      createdAt: new Date().toISOString(),
    });
    setName("");
    setPicked([]);
  };

  const journalSave = () => {
    if (!before.trim() && !after.trim()) return;
    addJournal({
      id: crypto.randomUUID(),
      before: before.trim(),
      after: after.trim(),
      asanas: [],
      createdAt: new Date().toISOString(),
    });
    setBefore("");
    setAfter("");
  };

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Practice Builder</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Build a sequence. Count your sun salutations. Journal what shifted.
        </p>
      </header>

      <section className="quest-panel-air rounded-3xl p-6">
        <h2 className="text-xl font-bold text-foreground">Sun Salutation Counter</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Lifetime count: <span className="font-bold text-orchid-glow">{progress.sunSalutations}</span>
        </p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => incrementSunSalutations(1)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">+1</button>
          <button onClick={() => incrementSunSalutations(3)} className="rounded-full border border-border/60 px-4 py-2 text-sm">+3</button>
          <button onClick={() => incrementSunSalutations(9)} className="rounded-full border border-border/60 px-4 py-2 text-sm">+9</button>
        </div>
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">Sequence Builder</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sequence name (e.g. 'Morning Wake-Up')"
          className="mt-3 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Pick poses (in order):</p>
        <div className="mt-2 grid max-h-64 gap-1 overflow-y-auto rounded-lg border border-border/40 bg-background/40 p-2 sm:grid-cols-2">
          {asanas.map((a) => {
            const sel = picked.includes(a.slug);
            return (
              <button
                key={a.slug}
                onClick={() => togglePick(a.slug)}
                className={`rounded-md px-2 py-1 text-left text-xs ${sel ? "bg-orchid-glow/20 text-foreground" : "text-muted-foreground hover:bg-secondary"}`}
              >
                {sel ? "✓ " : ""}{a.english}
              </button>
            );
          })}
        </div>
        {picked.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Order: {picked.map((s) => getAsanaName(s)).join(" → ")}
          </p>
        )}
        <button
          onClick={save}
          disabled={!name.trim() || picked.length === 0}
          className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Save sequence
        </button>

        {progress.sequences.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-widest text-orchid-glow">Saved sequences</p>
            {progress.sequences.map((s) => (
              <div key={s.id} className="flex items-start justify-between rounded-xl border border-border/40 bg-background/40 p-3">
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.steps.map((st) => getAsanaName(st.slug)).join(" → ")}</p>
                </div>
                <button onClick={() => deleteSequence(s.id)} className="text-xs text-coral-glow hover:underline">Delete</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-border/50 bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">Practice Journal</h2>
        <textarea
          value={before}
          onChange={(e) => setBefore(e.target.value)}
          placeholder="Before practice — how do you feel?"
          className="mt-3 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          rows={2}
        />
        <textarea
          value={after}
          onChange={(e) => setAfter(e.target.value)}
          placeholder="After practice — what shifted?"
          className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          rows={2}
        />
        <button onClick={journalSave} className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Save entry
        </button>

        {progress.journal.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-widest text-orchid-glow">Recent entries</p>
            {progress.journal.slice(0, 5).map((j) => (
              <div key={j.id} className="rounded-xl border border-border/40 bg-background/40 p-3 text-xs">
                <p className="text-muted-foreground">{new Date(j.createdAt).toLocaleString()}</p>
                {j.before && <p className="mt-1"><span className="text-orchid-glow">Before:</span> {j.before}</p>}
                {j.after && <p className="mt-1"><span className="text-orchid-glow">After:</span> {j.after}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
