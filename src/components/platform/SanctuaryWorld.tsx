import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Compass,
  Flower2,
  Footprints,
  HandHeart,
  Leaf,
  MoonStar,
  Sparkles,
  Wind,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { dailyQuests, mainQuests, skillTrees, weeklyQuests } from "./data";

type ZoneKey = "overview" | "herbs" | "energy" | "movement" | "touch" | "spirit";
type Point = { x: number; y: number };

const allQuests = [...dailyQuests, ...weeklyQuests, ...mainQuests];
const WORLD_WIDTH = 1200;
const WORLD_HEIGHT = 760;
const START_POSITION: Point = { x: 600, y: 640 };

const zones = [
  {
    key: "herbs" as const,
    label: "Herbal Garden",
    tree: "Herbal Wisdom",
    Icon: Leaf,
    position: { x: 310, y: 470 },
    aura: "bg-earth/20 text-earth border-earth/45",
    copy: "Living terraces for plant allies, tea rituals, and grounded daily nourishment.",
  },
  {
    key: "energy" as const,
    label: "Energy Temple",
    tree: "Energy Mastery",
    Icon: MoonStar,
    position: { x: 600, y: 245 },
    aura: "bg-spirit/20 text-spirit border-spirit/45",
    copy: "A marble chamber for breathwork, subtle energy, meditation, and inner radiance.",
  },
  {
    key: "movement" as const,
    label: "Movement Terrace",
    tree: "Movement Arts",
    Icon: Wind,
    position: { x: 890, y: 470 },
    aura: "bg-air/20 text-air border-air/45",
    copy: "Open-air paths for qigong, yoga, mobility, posture, and graceful strength.",
  },
  {
    key: "touch" as const,
    label: "Healing Springs",
    tree: "Healing Touch",
    Icon: HandHeart,
    position: { x: 450, y: 585 },
    aura: "bg-fire/20 text-fire border-fire/45",
    copy: "Warm waters and stone basins for acupressure, massage, and hands of light.",
  },
  {
    key: "spirit" as const,
    label: "Spirit Observatory",
    tree: "Mind & Spirit",
    Icon: Flower2,
    position: { x: 750, y: 585 },
    aura: "bg-water/20 text-water border-water/45",
    copy: "A sky-facing sanctuary for shadow work, emotional clarity, and higher guidance.",
  },
];

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clampPosition(point: Point): Point {
  const center = { x: WORLD_WIDTH / 2, y: 455 };
  const radiusX = 455;
  const radiusY = 250;
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const normalized = dx ** 2 / radiusX ** 2 + dy ** 2 / radiusY ** 2;

  if (normalized <= 1) {
    return {
      x: Math.max(185, Math.min(WORLD_WIDTH - 185, point.x)),
      y: Math.max(220, Math.min(675, point.y)),
    };
  }

  const angle = Math.atan2(dy / radiusY, dx / radiusX);
  return {
    x: center.x + Math.cos(angle) * radiusX,
    y: center.y + Math.sin(angle) * radiusY,
  };
}

export function SanctuaryWorld() {
  const [hasEntered, setHasEntered] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState<Point>(START_POSITION);
  const [targetPosition, setTargetPosition] = useState<Point | null>(null);
  const [manualZone, setManualZone] = useState<ZoneKey>("overview");
  const keysPressed = useRef(new Set<string>());

  const nearbyZone = useMemo(() => {
    return zones.find((zone) => distance(zone.position, avatarPosition) < 92);
  }, [avatarPosition]);

  const activeZone = nearbyZone?.key ?? manualZone;
  const selectedZone = zones.find((zone) => zone.key === activeZone);
  const selectedTree = skillTrees.find((tree) => tree.name === selectedZone?.tree) ?? skillTrees[1];
  const zoneQuests = useMemo(
    () => allQuests.filter((quest) => quest.tree === selectedTree.name).slice(0, 3),
    [selectedTree.name],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        keysPressed.current.add(key);
        setTargetPosition(null);
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      keysPressed.current.delete(event.key.toLowerCase());
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    let frame = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const delta = Math.min(32, now - lastTime) / 16.67;
      lastTime = now;

      setAvatarPosition((current) => {
        const keys = keysPressed.current;
        let velocity = { x: 0, y: 0 };

        if (keys.has("arrowleft") || keys.has("a")) velocity.x -= 1;
        if (keys.has("arrowright") || keys.has("d")) velocity.x += 1;
        if (keys.has("arrowup") || keys.has("w")) velocity.y -= 1;
        if (keys.has("arrowdown") || keys.has("s")) velocity.y += 1;

        if (velocity.x || velocity.y) {
          const magnitude = Math.hypot(velocity.x, velocity.y) || 1;
          return clampPosition({
            x: current.x + (velocity.x / magnitude) * 5.2 * delta,
            y: current.y + (velocity.y / magnitude) * 5.2 * delta,
          });
        }

        if (targetPosition) {
          const dx = targetPosition.x - current.x;
          const dy = targetPosition.y - current.y;
          const remaining = Math.hypot(dx, dy);
          if (remaining < 5) {
            setTargetPosition(null);
            return current;
          }
          return clampPosition({
            x: current.x + (dx / remaining) * Math.min(remaining, 4.6 * delta),
            y: current.y + (dy / remaining) * Math.min(remaining, 4.6 * delta),
          });
        }

        return current;
      });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered, targetPosition]);

  function walkTo(zone: (typeof zones)[number]) {
    setManualZone(zone.key);
    setTargetPosition(zone.position);
  }

  function resetView() {
    setManualZone("overview");
    setTargetPosition(START_POSITION);
  }

  return (
    <section className="sanctuary-world relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-sky-sanctuary)]" />
      <div className="sun-rays absolute inset-x-0 top-0 h-[30rem] opacity-85" />
      <div className="star-field absolute inset-0 opacity-20" />
      <div className="sanctuary-clouds absolute inset-x-[-10%] bottom-[-12%] h-[52%]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_0_38%,color-mix(in_oklab,var(--background)_46%,transparent)_86%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col px-4 pb-5 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[34rem]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Third-Person Sanctuary</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Walk the floating temple.
            </h1>
          </div>
          {hasEntered ? (
            <button
              onClick={resetView}
              className="sanctuary-panel hidden items-center gap-2 rounded-full border border-border/60 px-4 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02] sm:inline-flex"
            >
              <Compass className="h-4 w-4 text-primary" /> Arrival Terrace
            </button>
          ) : null}
        </div>

        <div className="relative mt-3 min-h-[34rem] flex-1 overflow-hidden rounded-[2rem] border border-border/35 bg-background/20 shadow-[var(--shadow-aura)] lg:min-h-[38rem]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,color-mix(in_oklab,var(--foreground)_20%,transparent),transparent_34%)]" />
          <div
            className={`third-person-stage absolute inset-0 transition-[transform,opacity,filter] duration-[1600ms] ease-out ${hasEntered ? "opacity-100 blur-0" : "opacity-70 blur-[2px]"}`}
            style={{
              transform: hasEntered
                ? `translate3d(calc(50% - ${avatarPosition.x}px), calc(62% - ${avatarPosition.y}px), 0) scale(1.08)`
                : "translate3d(calc(50% - 600px), calc(64% - 455px), 0) scale(.64)",
            }}
          >
            <FloatingSanctuaryWorld avatarPosition={avatarPosition} activeZone={activeZone} onWalkTo={walkTo} />
          </div>

          {hasEntered ? <Avatar position={avatarPosition} /> : null}

          {!hasEntered ? (
            <div className="absolute inset-0 z-30 grid place-items-center px-4">
              <div className="sanctuary-panel max-w-xl rounded-[2rem] border border-primary/35 p-7 text-center shadow-[var(--shadow-aura)] sm:p-9">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/45 bg-primary/15 shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-5 text-3xl font-bold text-foreground">Begin Descent</h2>
                <p className="mt-3 text-muted-foreground">
                  Fly through the clouds, land at the arrival terrace, then guide your avatar through the sanctuary.
                </p>
                <button
                  onClick={() => setHasEntered(true)}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
                >
                  Land on the Island <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}

          {hasEntered ? (
            <>
              <MovementHud />
              <WorldPanel
                activeZone={activeZone}
                selectedZone={selectedZone}
                selectedTree={selectedTree}
                zoneQuests={zoneQuests}
                onBack={resetView}
                onSelect={(key) => {
                  const zone = zones.find((item) => item.key === key);
                  if (zone) walkTo(zone);
                }}
              />
            </>
          ) : null}
        </div>

        {hasEntered ? (
          <div className="sanctuary-panel z-20 mt-4 flex gap-2 overflow-x-auto rounded-full border border-border/60 p-2 scrollbar-none lg:hidden">
            {zones.map((zone) => (
              <button
                key={zone.key}
                onClick={() => walkTo(zone)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeZone === zone.key ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-secondary-foreground"}`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FloatingSanctuaryWorld({
  avatarPosition,
  activeZone,
  onWalkTo,
}: {
  avatarPosition: Point;
  activeZone: ZoneKey;
  onWalkTo: (zone: (typeof zones)[number]) => void;
}) {
  return (
    <div className="absolute left-0 top-0 h-[760px] w-[1200px]">
      <div className="absolute left-[155px] top-[128px] h-[540px] w-[890px] rounded-[50%] bg-primary/16 blur-3xl" />
      <div className="floating-island sanctuary-landmass absolute left-[160px] top-[145px] h-[520px] w-[880px]">
        <div className="absolute left-[50%] top-[6%] z-20 h-[190px] w-[330px] -translate-x-1/2 rounded-t-[1.3rem] border border-primary/35 bg-secondary/92 shadow-[var(--shadow-soft)] marble-sheen">
          <div className="absolute -top-12 left-1/2 h-20 w-[380px] -translate-x-1/2 [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-secondary shadow-[var(--shadow-soft)]" />
          <div className="absolute left-1/2 top-7 h-16 w-52 -translate-x-1/2 rounded-t-full border border-primary/25 bg-background/25" />
          <div className="absolute bottom-0 left-8 right-8 flex justify-between">
            {Array.from({ length: 7 }).map((_, index) => (
              <span key={index} className="h-28 w-6 rounded-full bg-background/42 shadow-inner" />
            ))}
          </div>
        </div>

        <div className="absolute left-[50%] top-[28%] z-10 h-[270px] w-[760px] -translate-x-1/2 rounded-[48%_52%_44%_46%] border border-primary/25 bg-[var(--gradient-island-garden)] shadow-[var(--shadow-aura)]" />
        <div className="absolute left-[50%] top-[44%] z-20 h-[280px] w-[480px] -translate-x-1/2 [clip-path:polygon(14%_0,86%_0,100%_35%,70%_100%,30%_100%,0_35%)] bg-secondary/70 shadow-[var(--shadow-soft)]" />
        <div className="absolute left-[50%] top-[49%] z-30 h-[250px] w-[210px] -translate-x-1/2 [clip-path:polygon(36%_0,64%_0,82%_100%,18%_100%)] bg-background/40" />
        <div className="absolute left-[23%] top-[45%] z-30 h-32 w-52 rounded-[48%] bg-earth/30 blur-sm" />
        <div className="absolute right-[20%] top-[45%] z-30 h-32 w-52 rounded-[48%] bg-air/24 blur-sm" />
        <div className="absolute left-[34%] top-[61%] z-30 h-28 w-48 rounded-[48%] bg-fire/20 blur-sm" />
        <div className="absolute right-[33%] top-[61%] z-30 h-28 w-48 rounded-[48%] bg-water/24 blur-sm" />
        <div className="waterfall absolute left-[47%] top-[69%] z-0 h-[360px] w-9 rounded-full" />
        <div className="waterfall absolute left-[53%] top-[68%] z-0 h-[390px] w-12 rounded-full opacity-85" />
        <div className="absolute left-[50%] top-[76%] h-52 w-[520px] -translate-x-1/2 [clip-path:polygon(8%_0,92%_0,62%_100%,38%_100%)] bg-muted/80 shadow-[var(--shadow-soft)]" />

        <WalkablePath />

        {zones.map((zone) => {
          const isNear = distance(zone.position, avatarPosition) < 92;
          return (
            <button
              key={zone.key}
              onClick={() => onWalkTo(zone)}
              className={`sanctuary-portal absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[var(--shadow-glow)] transition-transform hover:scale-110 ${zone.aura} ${activeZone === zone.key || isNear ? "scale-110 ring-2 ring-primary/70" : ""}`}
              style={{ left: zone.position.x - 160, top: zone.position.y - 145 }}
              aria-label={`Walk to ${zone.label}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-background/72 backdrop-blur-xl">
                <zone.Icon className="h-6 w-6" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WalkablePath() {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      <div className="absolute left-[50%] top-[39%] h-[280px] w-24 -translate-x-1/2 rounded-full bg-primary/12 blur-sm" />
      <div className="absolute left-[31%] top-[56%] h-14 w-[340px] -rotate-12 rounded-full bg-primary/10 blur-sm" />
      <div className="absolute right-[31%] top-[56%] h-14 w-[340px] rotate-12 rounded-full bg-primary/10 blur-sm" />
      <div className="absolute left-[43%] top-[68%] h-14 w-[190px] -rotate-12 rounded-full bg-primary/12 blur-sm" />
      <div className="absolute right-[43%] top-[68%] h-14 w-[190px] rotate-12 rounded-full bg-primary/12 blur-sm" />
    </div>
  );
}

function Avatar({ position }: { position: Point }) {
  const scale = 0.9 + (position.y - 220) / 900;

  return (
    <div className="pointer-events-none absolute left-1/2 top-[62%] z-20 -translate-x-1/2 -translate-y-full">
      <div className="avatar-shadow absolute left-1/2 top-[102%] h-8 w-20 -translate-x-1/2 rounded-full bg-background/45 blur-md" />
      <div className="third-person-avatar relative" style={{ transform: `scale(${scale})` }}>
        <div className="absolute -inset-7 rounded-full bg-primary/18 blur-2xl" />
        <div className="relative mx-auto h-9 w-9 rounded-full border border-primary/50 bg-secondary shadow-[var(--shadow-glow)]" />
        <div className="relative mx-auto mt-1 h-20 w-14 rounded-[45%_45%_35%_35%] border border-primary/35 bg-[var(--gradient-avatar)] shadow-[var(--shadow-soft)]" />
        <div className="absolute left-1/2 top-12 h-16 w-20 -translate-x-1/2 rounded-full border border-primary/20 bg-background/20" />
      </div>
    </div>
  );
}

function MovementHud() {
  return (
    <div className="sanctuary-panel absolute left-4 top-4 z-30 hidden rounded-2xl border border-border/60 p-3 shadow-[var(--shadow-soft)] md:block">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Footprints className="h-4 w-4 text-primary" /> Move
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1 text-xs font-bold text-muted-foreground">
        <span />
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">W</kbd>
        <span />
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">A</kbd>
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">S</kbd>
        <kbd className="rounded-md border border-border/50 bg-background/45 px-2 py-1 text-center">D</kbd>
      </div>
    </div>
  );
}

function WorldPanel({
  activeZone,
  selectedZone,
  selectedTree,
  zoneQuests,
  onBack,
  onSelect,
}: {
  activeZone: ZoneKey;
  selectedZone?: (typeof zones)[number];
  selectedTree: (typeof skillTrees)[number];
  zoneQuests: typeof allQuests;
  onBack: () => void;
  onSelect: (zone: ZoneKey) => void;
}) {
  if (activeZone === "overview" || !selectedZone) {
    return (
      <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-30 rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-6 lg:left-auto lg:right-6 lg:w-[24rem]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Arrival Terrace</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">Move your avatar into a glowing sanctuary gate.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Walk with WASD or tap a destination. Each temple area opens quests that strengthen your skill tree.
        </p>
        <div className="mt-5 grid gap-2">
          {zones.map((zone) => (
            <button
              key={zone.key}
              onClick={() => onSelect(zone.key)}
              className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/35 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
            >
              <span>{zone.label}</span>
              <zone.Icon className="h-4 w-4 text-primary" />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-30 rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-6 lg:left-auto lg:right-6 lg:w-[25rem]">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Arrival Terrace
      </button>
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-[40%] border ${selectedZone.aura}`}>
          <selectedZone.Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{selectedTree.name}</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">{selectedZone.label}</h2>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{selectedZone.copy}</p>
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>Level {selectedTree.level}</span>
          <span>{selectedTree.progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-water to-spirit shadow-[var(--shadow-glow)]"
            style={{ width: `${selectedTree.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {(zoneQuests.length ? zoneQuests : allQuests.slice(0, 2)).map((quest) => (
          <div key={quest.title} className="rounded-2xl border border-border/60 bg-background/42 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-foreground">{quest.title}</p>
              <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-xs font-bold text-primary">
                {quest.xp} XP
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{quest.status}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to="/quests"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
        >
          Quests
        </Link>
        <Link
          to="/skill-trees"
          className="inline-flex items-center justify-center rounded-full border border-border/70 bg-secondary/75 px-4 py-3 text-sm font-bold text-secondary-foreground"
        >
          Skill Tree
        </Link>
      </div>
    </aside>
  );
}
