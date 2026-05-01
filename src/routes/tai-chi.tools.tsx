import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BreathPacer } from "@/components/breathwork/BreathPacer";
import {
  postures,
  getPostureName,
  silkReelingDrills,
  zhanZhuang,
  pushHandsDrills,
} from "@/lib/tai-chi-data";
import { useTaiChiProgress, type TaiChiJournalEntry } from "@/lib/tai-chi-progress";

export const Route = createFileRoute("/tai-chi/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Practice Builder — Tai Chi | Ascend" },
      {
        name: "description",
        content:
          "Standing-post timer, breath-paced zhan zhuang, silk-reeling sequencer, partner-drill randomizer, form metronome, and practice journal.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <article className="space-y-14">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-orchid-glow">Practice</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
          Tools & Practice Builder
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Six interactive tools for the daily practitioner: a posture timer, breath-paced zhan
          zhuang, silk-reeling sequencer, form metronome, partner-drill randomizer, and a
          private journal that compounds over the years.
        </p>
      </header>

      <PostureTimer />
      <BreathPacedZhanZhuang />
      <SilkReelingBuilder />
      <FormMetronome />
      <PartnerDrillRandomizer />
      <PracticeJournal />

      <p className="text-sm">
        <Link to="/tai-chi/mastery" className="text-orchid-glow underline">
          → Take a tier-up: Path to Mastery
        </Link>
      </p>
    </article>
  );
}

function PostureTimer() {
  const [seconds, setSeconds] = useState(180);
  const [remaining, setRemaining] = useState(180);
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
      <p className="mt-2 text-sm text-muted-foreground">
        Set a hold time, breathe naturally, settle in. Beginners start at 3 minutes; serious
        students grow it to 30+.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
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
        <div className="ml-auto flex flex-wrap gap-2">
          {[60, 180, 300, 600, 1200].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSeconds(s);
                setRemaining(s);
              }}
              className="rounded-full border border-border/60 px-3 py-1 text-xs"
            >
              {s / 60} min
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-5xl font-bold text-orchid-glow tabular-nums">
        {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
      </p>
    </section>
  );
}

function BreathPacedZhanZhuang() {
  const [picked, setPicked] = useState(zhanZhuang[1].slug); // holding the ball
  const [inhale, setInhale] = useState(6);
  const [exhale, setExhale] = useState(6);
  const [cycles, setCycles] = useState(20);
  const post = zhanZhuang.find((z) => z.slug === picked) ?? zhanZhuang[0];

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Breath-paced standing post</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Choose a zhan zhuang posture, set the breath, and stand. Six-second nasal cycles sit
        right at cardiovascular resonance frequency.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <select
            value={picked}
            onChange={(e) => setPicked(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            {zhanZhuang.map((z) => (
              <option key={z.slug} value={z.slug}>
                {z.name} — {z.pinyin}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {[
              ["Inhale", inhale, setInhale, 12] as const,
              ["Exhale", exhale, setExhale, 12] as const,
              ["Cycles", cycles, setCycles, 60] as const,
            ].map(([label, val, set, max]) => (
              <label key={label} className="block">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  {label}: {val}
                </span>
                <input
                  type="range"
                  min={1}
                  max={max}
                  value={val}
                  onChange={(e) => set(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            ))}
          </div>

          <div className="rounded-xl border border-border/40 bg-background/40 p-4 text-sm">
            <p className="font-semibold text-foreground">{post.name}</p>
            <p className="mt-1 text-xs italic text-orchid-glow">{post.intent}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Starting dose: {post.startingDose} · Mature: {post.matureDose}
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              Watch for
            </p>
            <ul className="mt-1 space-y-0.5 text-xs text-coral-glow">
              {post.collapses.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <BreathPacer
          preset={{ inhale, holdIn: 0, exhale, holdOut: 0, cycles }}
          title={post.pinyin}
        />
      </div>
    </section>
  );
}

function SilkReelingBuilder() {
  const [picked, setPicked] = useState<string[]>([
    silkReelingDrills[0].slug,
    silkReelingDrills[1].slug,
  ]);

  const toggle = (slug: string) =>
    setPicked((arr) =>
      arr.includes(slug) ? arr.filter((s) => s !== slug) : [...arr, slug],
    );

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Silk-reeling sequencer</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Build a chan si gong set. Click drills to add or remove. Run them in order at the
        beginning of your session — silk-reeling primes the body for form practice the way
        scales prime a musician.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {silkReelingDrills.map((d) => {
          const on = picked.includes(d.slug);
          return (
            <button
              key={d.slug}
              onClick={() => toggle(d.slug)}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                on
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-card/40 hover:border-primary/40"
              }`}
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
                {d.level} · {d.side} · {d.plane}
              </p>
              <p className="mt-1 font-semibold text-foreground">{d.name}</p>
              <p className="text-xs italic text-muted-foreground">{d.pinyin}</p>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{d.description}</p>
              <p className="mt-2 text-xs text-orchid-glow">Dosage: {d.dosage}</p>
            </button>
          );
        })}
      </div>

      {picked.length > 0 && (
        <div className="mt-6 rounded-xl border border-orchid-glow/40 bg-orchid-glow/5 p-4">
          <p className="text-xs uppercase tracking-widest text-orchid-glow">Your set</p>
          <ol className="mt-2 space-y-1 text-sm">
            {picked.map((slug, i) => {
              const d = silkReelingDrills.find((x) => x.slug === slug);
              if (!d) return null;
              return (
                <li key={slug} className="text-foreground">
                  {i + 1}. {d.name} — <span className="text-muted-foreground">{d.dosage}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}

function FormMetronome() {
  const [bpm, setBpm] = useState(60);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(
      () => setTick((t) => t + 1),
      Math.max(200, 60_000 / bpm),
    );
    return () => window.clearInterval(interval);
  }, [running, bpm]);

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Form metronome</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        A subtle pulse for tempo discipline. Yang 24 at ~60 BPM (one transition per beat)
        finishes near 5–6 minutes. Faster than 80 BPM is no longer Tai Chi.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="text-sm">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            Tempo: {bpm} BPM
          </span>
          <input
            type="range"
            min={30}
            max={90}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-64"
          />
        </label>
        <button
          onClick={() => {
            setRunning((r) => !r);
            setTick(0);
          }}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {running ? "Stop" : "Start"}
        </button>
        <span
          aria-hidden
          className={`inline-block h-6 w-6 rounded-full transition-transform ${
            running ? "scale-110 bg-orchid-glow" : "bg-card"
          }`}
          style={{
            boxShadow: running && tick % 2 === 0 ? "0 0 24px var(--orchid-glow)" : "none",
            transition: "transform 120ms, box-shadow 120ms",
          }}
        />
      </div>
    </section>
  );
}

function PartnerDrillRandomizer() {
  const [maxTier, setMaxTier] = useState(2);
  const [picked, setPicked] = useState(pushHandsDrills[0]);

  const roll = () => {
    const eligible = pushHandsDrills.filter((d) => d.tier <= maxTier);
    setPicked(eligible[Math.floor(Math.random() * eligible.length)]);
  };

  return (
    <section className="rounded-2xl border border-border/50 bg-card/40 p-6">
      <h2 className="text-2xl font-bold text-foreground">Partner-drill randomizer</h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Stuck on the same two drills? Spin the wheel. Cap by your honest tier so you don't
        skip foundations.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="text-sm">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            Max tier: {maxTier}
          </span>
          <input
            type="range"
            min={1}
            max={5}
            value={maxTier}
            onChange={(e) => setMaxTier(Number(e.target.value))}
            className="w-48"
          />
        </label>
        <button
          onClick={roll}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Roll a drill
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-orchid-glow/40 bg-orchid-glow/5 p-4">
        <p className="text-[0.65rem] uppercase tracking-widest text-orchid-glow">
          Tier {picked.tier} · {picked.contact} · {picked.step}
        </p>
        <p className="mt-1 text-lg font-bold text-foreground">{picked.name}</p>
        <p className="text-xs italic text-muted-foreground">{picked.pinyin}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-orchid-glow">Goal: </span>
          {picked.goal}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{picked.protocol}</p>
      </div>
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
        A few notes after each session compound into years of insight. Stored privately on
        your device.
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
          {postures.slice(0, 16).map((p) => {
            const on = picked.includes(p.slug);
            return (
              <button
                key={p.slug}
                onClick={() =>
                  setPicked((arr) => (on ? arr.filter((s) => s !== p.slug) : [...arr, p.slug]))
                }
                className={`rounded-full px-3 py-1 text-xs ${
                  on
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/60 bg-card/40 text-muted-foreground"
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
            <div
              key={j.id}
              className="rounded-lg border border-border/50 bg-background/40 p-3 text-sm"
            >
              <p className="text-xs text-orchid-glow">
                {new Date(j.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">
                <span className="text-muted-foreground">Before: </span>
                {j.before}
              </p>
              <p>
                <span className="text-muted-foreground">After: </span>
                {j.after}
              </p>
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
