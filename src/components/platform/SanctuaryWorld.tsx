import { Link } from "@tanstack/react-router";
import { ArrowLeft, Compass, Flower2, HandHeart, Leaf, MoonStar, Sparkles, Wind } from "lucide-react";
import { useMemo, useState } from "react";
import { dailyQuests, mainQuests, skillTrees, weeklyQuests } from "./data";

type ZoneKey = "overview" | "herbs" | "energy" | "movement" | "touch" | "spirit";

const allQuests = [...dailyQuests, ...weeklyQuests, ...mainQuests];

const zoneCamera: Record<ZoneKey, string> = {
  overview: "translate3d(0, 0, 0) scale(1)",
  herbs: "translate3d(17%, -4%, 0) scale(1.28)",
  energy: "translate3d(0, 16%, 0) scale(1.32)",
  movement: "translate3d(-18%, -5%, 0) scale(1.28)",
  touch: "translate3d(14%, 16%, 0) scale(1.34)",
  spirit: "translate3d(-14%, 17%, 0) scale(1.34)",
};

const zones = [
  {
    key: "herbs" as const,
    label: "Herbal Garden",
    tree: "Herbal Wisdom",
    Icon: Leaf,
    position: "left-[22%] top-[56%]",
    aura: "bg-earth/20 text-earth border-earth/40",
    copy: "Living terraces for plant allies, tea rituals, and grounded daily nourishment.",
  },
  {
    key: "energy" as const,
    label: "Energy Temple",
    tree: "Energy Mastery",
    Icon: MoonStar,
    position: "left-[50%] top-[28%]",
    aura: "bg-spirit/20 text-spirit border-spirit/40",
    copy: "A marble chamber for breathwork, subtle energy, meditation, and inner radiance.",
  },
  {
    key: "movement" as const,
    label: "Movement Terrace",
    tree: "Movement Arts",
    Icon: Wind,
    position: "left-[77%] top-[56%]",
    aura: "bg-air/20 text-air border-air/40",
    copy: "Open-air paths for qigong, yoga, mobility, posture, and graceful strength.",
  },
  {
    key: "touch" as const,
    label: "Healing Springs",
    tree: "Healing Touch",
    Icon: HandHeart,
    position: "left-[34%] top-[75%]",
    aura: "bg-fire/20 text-fire border-fire/40",
    copy: "Warm waters and stone basins for acupressure, massage, and hands of light.",
  },
  {
    key: "spirit" as const,
    label: "Spirit Observatory",
    tree: "Mind & Spirit",
    Icon: Flower2,
    position: "left-[66%] top-[75%]",
    aura: "bg-water/20 text-water border-water/40",
    copy: "A sky-facing sanctuary for shadow work, emotional clarity, and higher guidance.",
  },
];

export function SanctuaryWorld() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeZone, setActiveZone] = useState<ZoneKey>("overview");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const selectedZone = zones.find((zone) => zone.key === activeZone);
  const selectedTree = skillTrees.find((tree) => tree.name === selectedZone?.tree) ?? skillTrees[1];
  const zoneQuests = useMemo(
    () => allQuests.filter((quest) => quest.tree === selectedTree.name).slice(0, 3),
    [selectedTree.name],
  );

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  return (
    <section
      className="sanctuary-world relative min-h-[calc(100vh-5rem)] overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 bg-[var(--gradient-sky-sanctuary)]" />
      <div className="sun-rays absolute inset-x-0 top-0 h-[28rem] opacity-80" />
      <div className="sanctuary-clouds absolute inset-x-[-10%] bottom-[-10%] h-[48%]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0_32%,color-mix(in_oklab,var(--background)_42%,transparent)_72%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Floating Sanctuary
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Land inside your celestial healing world.
            </h1>
          </div>
          {hasEntered ? (
            <button
              onClick={() => setActiveZone("overview")}
              className="sanctuary-panel hidden items-center gap-2 rounded-full border border-border/60 px-4 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02] sm:inline-flex"
            >
              <Compass className="h-4 w-4 text-primary" /> Island View
            </button>
          ) : null}
        </div>

        <div className="relative mt-4 min-h-[34rem] flex-1 lg:min-h-[38rem]">
          <div
            className={`sanctuary-camera absolute inset-0 transition-[transform,opacity,filter] duration-1000 ease-out ${hasEntered ? "opacity-100 blur-0" : "opacity-80 blur-[1px]"}`}
            style={{
              transform: `${hasEntered ? zoneCamera[activeZone] : "translate3d(0, 18%, 0) scale(.58)"} translate3d(${pointer.x * -18}px, ${pointer.y * -14}px, 0)`,
            }}
          >
            <FloatingIsland activeZone={activeZone} onSelect={setActiveZone} />
          </div>

          {!hasEntered ? (
            <div className="absolute inset-0 z-20 grid place-items-center px-4">
              <div className="sanctuary-panel max-w-xl rounded-[2rem] border border-primary/35 p-7 text-center shadow-[var(--shadow-aura)] sm:p-9">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/45 bg-primary/15 shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-5 text-3xl font-bold text-foreground">Enter Sanctuary</h2>
                <p className="mt-3 text-muted-foreground">
                  Your floating temple, gardens, springs, terraces, and observatory are waiting
                  above the clouds.
                </p>
                <button
                  onClick={() => setHasEntered(true)}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
                >
                  Begin Landing <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}

          {hasEntered ? (
            <WorldPanel
              activeZone={activeZone}
              selectedZone={selectedZone}
              selectedTree={selectedTree}
              zoneQuests={zoneQuests}
              onBack={() => setActiveZone("overview")}
            />
          ) : null}
        </div>

        {hasEntered ? (
          <div className="sanctuary-panel z-20 mt-4 flex gap-2 overflow-x-auto rounded-full border border-border/60 p-2 scrollbar-none lg:hidden">
            {zones.map((zone) => (
              <button
                key={zone.key}
                onClick={() => setActiveZone(zone.key)}
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

function FloatingIsland({
  activeZone,
  onSelect,
}: {
  activeZone: ZoneKey;
  onSelect: (zone: ZoneKey) => void;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 h-[38rem] w-[min(58rem,94vw)] -translate-x-1/2 -translate-y-1/2">
      <div className="absolute left-1/2 top-[20%] h-52 w-[34rem] -translate-x-1/2 rounded-[50%] bg-primary/20 blur-3xl" />
      <div className="floating-island absolute left-1/2 top-[18%] h-[28rem] w-[44rem] max-w-[92vw] -translate-x-1/2">
        <div className="absolute left-1/2 top-[4%] z-20 h-36 w-72 -translate-x-1/2 rounded-t-[1.25rem] border border-primary/35 bg-secondary/90 shadow-[var(--shadow-soft)] marble-sheen">
          <div className="absolute -top-8 left-1/2 h-16 w-80 -translate-x-1/2 [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-secondary shadow-[var(--shadow-soft)]" />
          <div className="absolute left-8 top-7 flex gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="h-24 w-5 rounded-full bg-background/45 shadow-inner" />
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 top-[30%] z-10 h-56 w-[42rem] -translate-x-1/2 rounded-[48%_52%_42%_45%] border border-primary/25 bg-[var(--gradient-island-garden)] shadow-[var(--shadow-aura)]" />
        <div className="absolute left-[12%] top-[43%] z-20 h-28 w-44 rounded-[45%] bg-earth/25 blur-sm" />
        <div className="absolute right-[10%] top-[42%] z-20 h-24 w-44 rounded-[45%] bg-air/20 blur-sm" />
        <div className="absolute left-[27%] top-[54%] z-20 h-24 w-48 rounded-[45%] bg-fire/16 blur-sm" />
        <div className="absolute right-[25%] top-[56%] z-20 h-24 w-48 rounded-[45%] bg-water/20 blur-sm" />
        <div className="waterfall absolute left-[45%] top-[56%] z-0 h-72 w-8 rounded-full" />
        <div className="waterfall absolute left-[55%] top-[55%] z-0 h-80 w-10 rounded-full opacity-80" />
        <div className="absolute left-1/2 top-[64%] h-60 w-[31rem] -translate-x-1/2 [clip-path:polygon(8%_0,92%_0,64%_100%,38%_100%)] bg-muted/80 shadow-[var(--shadow-soft)]" />

        {zones.map((zone) => (
          <button
            key={zone.key}
            onClick={() => onSelect(zone.key)}
            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-[var(--shadow-glow)] transition-transform hover:scale-110 ${zone.position} ${zone.aura} ${activeZone === zone.key ? "scale-110 ring-2 ring-primary/60" : ""}`}
            aria-label={zone.label}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-background/70 backdrop-blur-xl">
              <zone.Icon className="h-6 w-6" />
            </span>
          </button>
        ))}
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
}: {
  activeZone: ZoneKey;
  selectedZone?: (typeof zones)[number];
  selectedTree: (typeof skillTrees)[number];
  zoneQuests: typeof allQuests;
  onBack: () => void;
}) {
  if (activeZone === "overview" || !selectedZone) {
    return (
      <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-20 rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-8 lg:left-auto lg:right-8 lg:w-[24rem]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Island Map</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">Five living paths, one glowing self.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Each sanctuary region strengthens a different skill tree and unlocks practices for steady ascension.
        </p>
        <div className="mt-5 grid gap-2">
          {zones.map((zone) => (
            <button
              key={zone.key}
              onClick={() => onBack() || undefined}
              className="hidden"
              aria-hidden="true"
            />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="sanctuary-panel absolute bottom-4 left-4 right-4 z-20 rounded-[2rem] border border-border/60 p-5 shadow-[var(--shadow-aura)] lg:bottom-8 lg:left-auto lg:right-8 lg:w-[25rem]">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Island View
      </button>
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-[40%] border ${selectedZone.aura}`}>
          <selectedZone.Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {selectedTree.name}
          </p>
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