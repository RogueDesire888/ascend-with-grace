import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { postures, getPostureName } from "@/lib/tai-chi-data";
import { useTaiChiProgress, type TaiChiJournalEntry } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Practice Builder — Tai Chi | Ascend" },
      { name: "description", content: "Interactive form timer, sequence builder, and practice journal." },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <article className="space-y-12">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Practice</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Tools & Practice Builder</h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          A simple posture timer and a place to record what you noticed today.
        </p>
      </header>

      <PostureTimer />
      <PracticeJournal />
    </article>
  );
}

function PostureTimer() {
  const [seconds, setSeconds] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const tick = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (tick.current) window.clearInterval(tick.current);
      return;
    }
    tick.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return seconds;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) window.clearInterval(tick.current);
    };
  }, [running, seconds]);

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Posture / Zhan Zhuang timer</h2>
      <p className="mt-2 text-sm text-muted-foreground">Set a hold time, breathe naturally, settle in.</p>
      <div className="mt-5 flex items-center gap-3">
        <input
          type="number"
          min={10}
          step={10}
          value={seconds}
          onChange={(e) => {
            const v = Math.max(10, Number(e.target.value));
            setSeconds(v);
            setRemaining(v);
          }}
          className="w-24 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <span className="text-xs text-muted-foreground">seconds</span>
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setRemaining(seconds);
          }}
          className="rounded-full border border-border/60 px-4 py-2 text-sm"
        >
          Reset
        </button>
      </div>
      <p className="mt-5 text-5xl font-bold text-orchid-glow tabular-nums">
        {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
      </p>
    </section>
  );
}

function PracticeJournal() {
  const { progress, addJournal } = useTaiChiProgress();
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Practice journal</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        A few notes after each session compound into years of insight.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <textarea
          value={before}
          onChange={(e) => setBefore(e.target.value)}
          placeholder="How did you feel before?"
          className="min-h-24 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
        <textarea
          value={after}
          onChange={(e) => setAfter(e.target.value)}
          placeholder="What did you notice after?"
          className="min-h-24 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
        />
      </div>
      <div className="mt-3">
        <p className="text-xs text-muted-foreground">Postures practiced (click to toggle):</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {postures.slice(0, 12).map((p) => {
            const on = picked.includes(p.slug);
            return (
              <button
                key={p.slug}
                onClick={() => setPicked((arr) => (on ? arr.filter((s) => s !== p.slug) : [...arr, p.slug]))}
                className={`rounded-full px-3 py-1 text-xs ${
                  on ? "bg-primary text-primary-foreground" : "border border-border/60 bg-card/40 text-muted-foreground"
                }`}
              >
                {p.english}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          if (!before && !after) return;
          const entry: TaiChiJournalEntry = {
            id: crypto.randomUUID(),
            before,
            after,
            postures: picked,
            createdAt: new Date().toISOString(),
          };
          addJournal(entry);
          setBefore("");
          setAfter("");
          setPicked([]);
        }}
        className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        Save entry
      </button>

      {progress.journal.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-foreground">Recent entries</p>
          {progress.journal.slice(0, 5).map((j) => (
            <div key={j.id} className="rounded-lg border border-border/50 bg-background/40 p-3 text-sm">
              <p className="text-xs text-orchid-glow">{new Date(j.createdAt).toLocaleString()}</p>
              <p className="mt-1"><span className="text-muted-foreground">Before: </span>{j.before}</p>
              <p><span className="text-muted-foreground">After: </span>{j.after}</p>
              {j.postures.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {j.postures.map(getPostureName).join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
