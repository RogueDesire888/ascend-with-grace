import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BreathPacer } from "@/components/breathwork/BreathPacer";
import {
  type SavedSession,
  useBreathProgress,
} from "@/lib/breathwork-progress";

export const Route = createFileRoute("/breathwork/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Tech — Breathwork | Ascend" },
      { name: "description", content: "Customisable breath pacer, app and wearable guide, and a session builder with journal." },
    ],
  }),
  component: ToolsPage,
});

type Phase = "inhale" | "holdIn" | "exhale" | "holdOut";

function ToolsPage() {
  const [inhale, setInhale] = useState(4);
  const [holdIn, setHoldIn] = useState(4);
  const [exhale, setExhale] = useState(4);
  const [holdOut, setHoldOut] = useState(4);
  const [cycles, setCycles] = useState(12);

  return (
    <article className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Tools & Tech</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Pace your breath, design your own sessions, and explore apps and wearables.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Customisable Pacer</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="quest-panel-air rounded-3xl p-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Inhale", inhale, setInhale],
                ["Hold (full)", holdIn, setHoldIn],
                ["Exhale", exhale, setExhale],
                ["Hold (empty)", holdOut, setHoldOut],
              ].map(([label, val, set]) => (
                <label key={label as string} className="block text-sm">
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    {label as string}: {val as number}s
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={val as number}
                    onChange={(e) => (set as (n: number) => void)(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              ))}
              <label className="col-span-2 block text-sm">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Cycles: {cycles}
                </span>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={cycles}
                  onChange={(e) => setCycles(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            </div>
          </div>
          <BreathPacer preset={{ inhale, holdIn, exhale, holdOut, cycles }} title="Your custom pace" />
        </div>
      </section>

      <SessionBuilder />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Apps & Wearables</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Othership", note: "Guided breathwork app with live classes." },
            { name: "Breathwrk", note: "Quick functional breath exercises." },
            { name: "Apple Watch — Mindfulness", note: "Built-in breathe app for short pacers." },
            { name: "Oura Ring", note: "HRV and respiration tracking overnight." },
            { name: "Whoop", note: "Recovery-oriented HRV with breath-led training." },
            { name: "Polar H10", note: "Chest strap for live HRV biofeedback." },
          ].map((a) => (
            <a
              key={a.name}
              href="#"
              className="quest-panel-air rounded-2xl p-4 text-sm hover:-translate-y-1 transition-transform"
            >
              <p className="font-semibold text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.note}</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-cyan-glow">
                Affiliate link →
              </p>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}

function SessionBuilder() {
  const { progress, saveSession, deleteSession, addJournal } = useBreathProgress();
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<{ phase: Phase; seconds: number }[]>([
    { phase: "inhale", seconds: 4 },
    { phase: "exhale", seconds: 6 },
  ]);
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const addStep = () =>
    setSteps((s) => [...s, { phase: "inhale", seconds: 4 }]);
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= steps.length) return;
    const next = [...steps];
    [next[i], next[j]] = [next[j], next[i]];
    setSteps(next);
  };
  const update = (i: number, patch: Partial<{ phase: Phase; seconds: number }>) =>
    setSteps((s) => s.map((st, k) => (k === i ? { ...st, ...patch } : st)));
  const remove = (i: number) => setSteps((s) => s.filter((_, k) => k !== i));

  const save = () => {
    if (!name) return;
    const session: SavedSession = {
      id: `${Date.now()}`,
      name,
      steps,
      createdAt: new Date().toISOString(),
    };
    saveSession(session);
    setName("");
  };

  const submitJournal = () => {
    if (!before && !after) return;
    addJournal({
      id: `${Date.now()}`,
      before,
      after,
      createdAt: new Date().toISOString(),
    });
    setBefore("");
    setAfter("");
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-foreground">Session Builder & Journal</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="quest-panel-air rounded-3xl p-5">
          <input
            placeholder="Session name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          />
          <ul className="space-y-2">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                <select
                  value={s.phase}
                  onChange={(e) => update(i, { phase: e.target.value as Phase })}
                  className="rounded-lg border border-border/60 bg-background/60 px-2 py-1 text-sm"
                >
                  <option value="inhale">Inhale</option>
                  <option value="holdIn">Hold (full)</option>
                  <option value="exhale">Exhale</option>
                  <option value="holdOut">Hold (empty)</option>
                </select>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={s.seconds}
                  onChange={(e) => update(i, { seconds: Number(e.target.value) })}
                  className="w-16 rounded-lg border border-border/60 bg-background/60 px-2 py-1 text-sm"
                />
                <span className="text-xs text-muted-foreground">sec</span>
                <button onClick={() => move(i, -1)} className="text-muted-foreground">↑</button>
                <button onClick={() => move(i, 1)} className="text-muted-foreground">↓</button>
                <button onClick={() => remove(i)} className="text-coral-glow">×</button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="secondary" onClick={addStep} className="rounded-full">
              + Add step
            </Button>
            <Button size="sm" onClick={save} className="rounded-full" disabled={!name}>
              Save session
            </Button>
          </div>
        </div>
        <BreathPacer
          preset={{
            inhale: steps.find((s) => s.phase === "inhale")?.seconds ?? 0,
            holdIn: steps.find((s) => s.phase === "holdIn")?.seconds ?? 0,
            exhale: steps.find((s) => s.phase === "exhale")?.seconds ?? 0,
            holdOut: steps.find((s) => s.phase === "holdOut")?.seconds ?? 0,
            cycles: 8,
          }}
          title="Preview"
        />
      </div>

      {progress.sessions.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm uppercase tracking-widest text-cyan-glow">Saved sessions</h3>
          <ul className="grid gap-2 md:grid-cols-2">
            {progress.sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.steps.map((st) => `${st.phase}:${st.seconds}`).join(" · ")}
                  </p>
                </div>
                <button onClick={() => deleteSession(s.id)} className="text-xs text-coral-glow">
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="quest-panel-air rounded-3xl p-5">
          <h3 className="text-lg font-bold text-foreground">Journal</h3>
          <textarea
            placeholder="Before: how do you feel?"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
            className="mt-3 h-20 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="After: how do you feel?"
            value={after}
            onChange={(e) => setAfter(e.target.value)}
            className="mt-2 h-20 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          />
          <Button size="sm" onClick={submitJournal} className="mt-3 rounded-full">
            Save entry
          </Button>
        </div>
        <div className="space-y-2">
          {progress.journal.length === 0 && (
            <p className="text-sm italic text-muted-foreground">No entries yet.</p>
          )}
          {progress.journal.slice(0, 5).map((j) => (
            <div key={j.id} className="rounded-2xl border border-border/50 bg-card/40 p-3">
              <p className="text-xs text-muted-foreground">{new Date(j.createdAt).toLocaleString()}</p>
              {j.before && <p className="mt-1 text-sm"><strong>Before:</strong> {j.before}</p>}
              {j.after && <p className="text-sm"><strong>After:</strong> {j.after}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
