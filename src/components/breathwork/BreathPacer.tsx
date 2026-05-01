import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PacerPreset } from "@/lib/breathwork-data";

type Phase = "inhale" | "holdIn" | "exhale" | "holdOut";

type PhaseStep = { phase: Phase; seconds: number };

const phaseLabel: Record<Phase, string> = {
  inhale: "Inhale",
  holdIn: "Hold (full)",
  exhale: "Exhale",
  holdOut: "Hold (empty)",
};

const phaseColor: Record<Phase, string> = {
  inhale: "var(--cyan-glow)",
  holdIn: "var(--sun-glow)",
  exhale: "var(--orchid-glow)",
  holdOut: "var(--leaf-glow)",
};

function buildSteps(p: PacerPreset): PhaseStep[] {
  const steps: PhaseStep[] = [];
  if (p.inhale > 0) steps.push({ phase: "inhale", seconds: p.inhale });
  if (p.holdIn > 0) steps.push({ phase: "holdIn", seconds: p.holdIn });
  if (p.exhale > 0) steps.push({ phase: "exhale", seconds: p.exhale });
  if (p.holdOut > 0) steps.push({ phase: "holdOut", seconds: p.holdOut });
  return steps;
}

function tone(freq: number) {
  if (typeof window === "undefined") return;
  try {
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    o.start(now);
    o.stop(now + 0.3);
    setTimeout(() => ctx.close(), 400);
  } catch {
    /* ignore */
  }
}

const phaseFreq: Record<Phase, number> = {
  inhale: 523, // C5
  holdIn: 659, // E5
  exhale: 392, // G4
  holdOut: 330, // E4
};

export function BreathPacer({
  preset,
  cycles: cyclesProp,
  compact = false,
  title,
}: {
  preset: PacerPreset;
  cycles?: number;
  compact?: boolean;
  title?: string;
}) {
  const steps = useMemo(() => buildSteps(preset), [preset]);
  const totalCycles = cyclesProp ?? preset.cycles ?? 12;
  const [running, setRunning] = useState(false);
  const [audio, setAudio] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [secondInStep, setSecondInStep] = useState(0);
  const [cycle, setCycle] = useState(1);
  const startedAt = useRef<number | null>(null);

  // Tick loop
  useEffect(() => {
    if (!running || steps.length === 0) return;
    let raf = 0;
    let lastTick = performance.now();
    let elapsedMs = secondInStep * 1000;
    if (audio) tone(phaseFreq[steps[stepIndex].phase]);

    const loop = (now: number) => {
      const dt = now - lastTick;
      lastTick = now;
      elapsedMs += dt;
      const stepMs = steps[stepIndex].seconds * 1000;
      if (elapsedMs >= stepMs) {
        elapsedMs = 0;
        const nextIndex = (stepIndex + 1) % steps.length;
        if (nextIndex === 0) {
          if (cycle >= totalCycles) {
            setRunning(false);
            setStepIndex(0);
            setSecondInStep(0);
            setCycle(1);
            return;
          }
          setCycle((c) => c + 1);
        }
        setStepIndex(nextIndex);
        setSecondInStep(0);
        if (audio) tone(phaseFreq[steps[nextIndex].phase]);
      } else {
        setSecondInStep(elapsedMs / 1000);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, stepIndex, audio, steps, totalCycles, cycle]);

  const reset = () => {
    setRunning(false);
    setStepIndex(0);
    setSecondInStep(0);
    setCycle(1);
    startedAt.current = null;
  };

  const current = steps[stepIndex];
  if (!current) {
    return (
      <div className="rounded-2xl border border-border/50 bg-background/40 p-4 text-sm text-muted-foreground">
        Empty pacer. Add at least one phase.
      </div>
    );
  }

  // visual: scale circle. Inhale grows, exhale shrinks, holds stay.
  const phaseProgress = current.seconds === 0 ? 1 : Math.min(1, secondInStep / current.seconds);
  let scale = 1;
  if (current.phase === "inhale") scale = 0.6 + 0.4 * phaseProgress;
  else if (current.phase === "exhale") scale = 1 - 0.4 * phaseProgress;
  else if (current.phase === "holdIn") scale = 1;
  else scale = 0.6;

  const remaining = Math.max(0, Math.ceil(current.seconds - secondInStep));

  const size = compact ? 140 : 220;

  return (
    <div className="apothecary-card-air rounded-3xl p-5 sm:p-6">
      {title && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-glow">
          {title}
        </p>
      )}
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative grid place-items-center rounded-full"
          style={{ width: size, height: size }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full transition-transform duration-500 ease-in-out"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${phaseColor[current.phase]}, transparent 70%)`,
              transform: `scale(${scale})`,
              transitionDuration: `${Math.max(200, current.seconds * 1000)}ms`,
            }}
          />
          <div
            aria-hidden
            className="absolute rounded-full border-2 transition-transform ease-in-out"
            style={{
              borderColor: phaseColor[current.phase],
              width: size * 0.7,
              height: size * 0.7,
              transform: `scale(${scale})`,
              transitionDuration: `${Math.max(200, current.seconds * 1000)}ms`,
              boxShadow: `0 0 60px ${phaseColor[current.phase]}`,
              opacity: 0.7,
            }}
          />
          <div className="relative z-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">
              {phaseLabel[current.phase]}
            </p>
            <p className="text-4xl font-bold text-foreground">{remaining}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cycle {cycle} / {totalCycles}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            onClick={() => setRunning((r) => !r)}
            size="sm"
            className="rounded-full"
          >
            {running ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
            {running ? "Pause" : "Begin"}
          </Button>
          <Button onClick={reset} size="sm" variant="secondary" className="rounded-full">
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={() => setAudio((a) => !a)}
            size="sm"
            variant="ghost"
            className="rounded-full"
          >
            {audio ? <Volume2 className="mr-1 h-4 w-4" /> : <VolumeX className="mr-1 h-4 w-4" />}
            {audio ? "Sound on" : "Sound off"}
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-[0.7rem] uppercase tracking-widest">
          {steps.map((s, i) => (
            <span
              key={`${s.phase}-${i}`}
              className={`rounded-full border px-2 py-0.5 ${
                i === stepIndex
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-border/50 text-muted-foreground"
              }`}
            >
              {phaseLabel[s.phase]} {s.seconds}s
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
