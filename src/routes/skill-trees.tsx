import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageFrame } from "@/components/platform/PlatformUI";
import { skillTrees } from "@/components/platform/data";
import { Progress } from "@/components/ui/progress";
import { useTreeProgress, type TreeKey } from "@/lib/progress-store";
import { TreeOfLife, type TreeNode } from "@/components/platform/TreeOfLife";

export const Route = createFileRoute("/skill-trees")({
  head: () => ({
    meta: [
      { title: "Tree of Life — Five Healing Skill Trees | Ascend" },
      {
        name: "description",
        content:
          "A living tree of life. Each branch is a healing skill — herbs, energy, movement, touch, mind & spirit — growing from one shared trunk.",
      },
      { property: "og:title", content: "Tree of Life — Skill Trees | Ascend" },
      {
        property: "og:description",
        content: "Tap a branch to follow your path. Roots gather every practice into one ascension.",
      },
    ],
  }),
  component: SkillTreesPage,
});

const liveTreeMap: Record<string, { key: TreeKey; levels: number; questsPerLevel: number[]; href: string; cta: string }> = {
  "Herbal Wisdom": {
    key: "herbal-wisdom",
    levels: 5,
    questsPerLevel: [5, 4, 4, 5, 4],
    href: "/alchemists-path",
    cta: "Open the Alchemist's Path",
  },
  "Movement Arts": {
    key: "movement-arts",
    levels: 5,
    questsPerLevel: [8, 8, 9, 8, 8],
    href: "/yoga-therapy-lab",
    cta: "Enter Yoga & Tai Chi Labs",
  },
};

// Tree-of-Life node positions inside viewBox 0 0 600 760.
// Crown at top, two upper limbs, two lower limbs — symmetrical.
const positions: Record<string, { x: number; y: number }> = {
  "Mind & Spirit": { x: 300, y: 110 }, // crown
  "Energy Mastery": { x: 470, y: 240 }, // upper right
  "Movement Arts": { x: 130, y: 240 }, // upper left
  "Herbal Wisdom": { x: 470, y: 470 }, // lower right
  "Healing Touch": { x: 130, y: 470 }, // lower left
};

function SkillTreesPage() {
  // Live progress for the two wired trees
  const herbal = useTreeProgress("herbal-wisdom");
  const movement = useTreeProgress("movement-arts");

  const nodes: TreeNode[] = useMemo(
    () =>
      skillTrees.map((t) => {
        const live = liveTreeMap[t.name];
        let progress = t.progress;
        if (live) {
          const totalQuests = live.questsPerLevel.reduce((a, b) => a + b, 0);
          const src = live.key === "herbal-wisdom" ? herbal.progress : movement.progress;
          const completedQuests = Object.values(src.quests).filter(Boolean).length;
          const completedLevels = Object.values(src.levels).filter(Boolean).length;
          const xp = completedQuests * 25 + completedLevels * 100;
          const xpMax = totalQuests * 25 + live.levels * 100;
          progress = xpMax === 0 ? 0 : Math.round((xp / xpMax) * 100);
        }
        // Tone class — strip the bg/border parts, keep just the text-color
        const tone = t.className.split(" ").find((c) => c.startsWith("text-")) ?? "text-primary";
        return {
          key: t.name,
          name: t.name,
          short: t.short,
          Icon: t.Icon,
          toneClass: tone,
          progress,
          ...positions[t.name]!,
        };
      }),
    [herbal.progress, movement.progress],
  );

  const [selectedKey, setSelectedKey] = useState<string>("Mind & Spirit");
  const selected = skillTrees.find((t) => t.name === selectedKey)!;
  const selectedNode = nodes.find((n) => n.key === selectedKey)!;

  // Roots = average across branches
  const rootsProgress = nodes.reduce((sum, n) => sum + n.progress, 0) / Math.max(1, nodes.length);
  const ascensionLevel = Math.max(1, Math.round(rootsProgress / 8));

  return (
    <PageFrame
      eyebrow="The tree of life"
      title="Five branches. One trunk. Roots that gather every practice."
    >
      <div className="space-y-8">
        <p className="max-w-2xl text-muted-foreground">
          Each branch is a path of healing. Tap a glowing fruit to walk that branch — your roots
          remember everything.
        </p>

        <TreeOfLife
          nodes={nodes}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
          rootsLabel={`Ascension Lv ${ascensionLevel}`}
          rootsProgress={rootsProgress}
        />

        {/* Selected branch detail */}
        {liveTreeMap[selected.name] ? (
          <LiveSkillCard tree={selected} live={liveTreeMap[selected.name]} progress={selectedNode.progress} />
        ) : (
          <StaticSkillCard tree={selected} />
        )}

        {/* Roots / legend strip */}
        <section className="rounded-2xl border border-border/60 bg-card/50 p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Roots</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">
                Ascension Level {ascensionLevel}
              </h3>
              <p className="text-xs text-muted-foreground">
                Balance across all five branches earns more glow than intensity in any one.
              </p>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {Math.round(rootsProgress)}%
            </span>
          </div>
          <Progress value={rootsProgress} className="mt-3 h-2" />
          <div className="mt-4 flex flex-wrap gap-2">
            {nodes.map((n) => (
              <button
                key={n.key}
                onClick={() => setSelectedKey(n.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition ${
                  selectedKey === n.key
                    ? "border-primary/60 bg-primary/15 text-foreground"
                    : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${n.toneClass} bg-current`} />
                {n.short} · {Math.round(n.progress)}%
              </button>
            ))}
          </div>
        </section>
      </div>
    </PageFrame>
  );
}

function LiveSkillCard({
  tree,
  live,
  progress,
}: {
  tree: (typeof skillTrees)[number];
  live: (typeof liveTreeMap)[string];
  progress: number;
}) {
  const src = useTreeProgress(live.key);
  const totalQuests = live.questsPerLevel.reduce((a, b) => a + b, 0);
  const completedQuests = Object.values(src.progress.quests).filter(Boolean).length;
  const completedLevels = Object.values(src.progress.levels).filter(Boolean).length;
  const playerLevel = Math.min(live.levels, completedLevels + 1);
  const xp = completedQuests * 25 + completedLevels * 100;
  const xpMax = totalQuests * 25 + live.levels * 100;

  return (
    <article className="sanctuary-panel rounded-[1.75rem] border border-border/60 p-6">
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-[38%] border ${tree.className}`}>
          <tree.Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{tree.name}</h3>
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
              Lv {playerLevel}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tree.description}</p>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Branch progress</span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            Quests <span className="font-semibold text-foreground">{completedQuests}/{totalQuests}</span>
            {" · "}
            Levels <span className="font-semibold text-foreground">{completedLevels}/{live.levels}</span>
            {" · "}
            <span className="font-semibold text-foreground">{xp}/{xpMax} XP</span>
          </span>
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-semibold text-primary">
            Live
          </span>
        </div>
      </div>
      <Link
        to={live.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)]"
      >
        {live.cta}
        <ExternalLink className="h-4 w-4" />
      </Link>
    </article>
  );
}

function StaticSkillCard({ tree }: { tree: (typeof skillTrees)[number] }) {
  return (
    <article className="sanctuary-panel rounded-[1.75rem] border border-border/60 p-6">
      <div className="flex items-start gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-[38%] border ${tree.className}`}>
          <tree.Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-foreground">{tree.name}</h3>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              Lv {tree.level}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tree.description}</p>
        </div>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-water to-spirit shadow-[var(--shadow-glow)]"
          style={{ width: `${tree.progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Next: <span className="text-foreground">{tree.nextQuest}</span>
      </p>
    </article>
  );
}
