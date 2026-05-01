import { createFileRoute, Link } from "@tanstack/react-router";
import { PageFrame, SkillWheel } from "@/components/platform/PlatformUI";
import { skillTrees } from "@/components/platform/data";
import { Progress } from "@/components/ui/progress";
import { useTreeProgress, type TreeKey } from "@/lib/progress-store";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/skill-trees")({
  head: () => ({
    meta: [
      { title: "Five Healing Skill Trees — Ascend" },
      {
        name: "description",
        content:
          "Explore interconnected levels for herbs, energy, movement, healing touch, and mind spirit practices.",
      },
      { property: "og:title", content: "Five Healing Skill Trees — Ascend" },
      {
        property: "og:description",
        content: "A visual skill tree interface for holistic healing progress.",
      },
    ],
  }),
  component: SkillTreesPage,
});

// Map static skill trees to live progress sources where wired.
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
    // Yoga (4,4,5,4,4) + Tai Chi (4,4,4,4,4) — collected by tree
    questsPerLevel: [8, 8, 9, 8, 8],
    href: "/yoga-therapy-lab",
    cta: "Enter Yoga & Tai Chi Labs",
  },
};

function SkillTreesPage() {
  return (
    <PageFrame
      eyebrow="Skill trees"
      title="Every practice strengthens the whole healer within you."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <section className="sticky top-28 rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
          <SkillWheel />
          <p className="mt-6 text-center text-muted-foreground">
            Your Ascension Level blends progress from all five trees, rewarding balance over
            intensity.
          </p>
        </section>
        <section className="grid gap-4">
          {skillTrees.map((tree) => {
            const live = liveTreeMap[tree.name];
            return live ? (
              <LiveSkillCard key={tree.name} tree={tree} live={live} />
            ) : (
              <StaticSkillCard key={tree.name} tree={tree} />
            );
          })}
        </section>
      </div>
    </PageFrame>
  );
}

function LiveSkillCard({
  tree,
  live,
}: {
  tree: (typeof skillTrees)[number];
  live: (typeof liveTreeMap)[string];
}) {
  const { progress } = useTreeProgress(live.key);
  const completedLevels = Array.from({ length: live.levels }).filter((_, i) => {
    const levelId = live.key === "herbal-wisdom" ? `level-${i + 1}` : null;
    if (levelId && progress.levels[levelId]) return true;
    // movement-arts has multiple namespaces (yoga-l*, tc-l*), don't count here.
    return false;
  }).length;

  // Count completed quests across all keys belonging to this tree
  const totalQuests = live.questsPerLevel.reduce((a, b) => a + b, 0);
  const completedQuests = Object.entries(progress.quests).filter(([, v]) => v).length;
  const completedLevelsAll = Object.entries(progress.levels).filter(([, v]) => v).length;
  const playerLevel = Math.min(live.levels, completedLevelsAll + 1);
  const xp = completedQuests * 25 + completedLevelsAll * 100;
  const xpMax = totalQuests * 25 + live.levels * 100;
  const pct = xpMax === 0 ? 0 : Math.round((xp / xpMax) * 100);
  void completedLevels;

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
          <span>Progress</span>
          <span className="font-semibold text-foreground">{xp} / {xpMax} XP</span>
        </div>
        <Progress value={pct} className="h-3" />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            Quests <span className="font-semibold text-foreground">{completedQuests}/{totalQuests}</span>
            {" · "}
            Levels <span className="font-semibold text-foreground">{completedLevelsAll}/{live.levels}</span>
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
