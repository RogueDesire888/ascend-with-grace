import { createFileRoute } from "@tanstack/react-router";
import { Palette, Rows3, Sparkles } from "lucide-react";
import { AvatarOrb, PageFrame, QuestCard, SkillWheel, StatsStrip, questGroups } from "@/components/platform/PlatformUI";

export const Route = createFileRoute("/sanctuary")({
  head: () => ({
    meta: [
      { title: "The Sanctuary Dashboard — Ascend" },
      { name: "description", content: "Your central hub for avatar glow, Ascension Level, daily quests, streaks, and healing skill trees." },
      { property: "og:title", content: "The Sanctuary Dashboard — Ascend" },
      { property: "og:description", content: "Track your elemental avatar, quests, streaks, and holistic healing progress." },
    ],
  }),
  component: SanctuaryPage,
});

function SanctuaryPage() {
  return (
    <PageFrame eyebrow="The Sanctuary" title="Your peaceful command center for becoming brighter every day.">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
          <AvatarOrb />
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-spirit">Spirit Avatar</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">Luma of the Inner Grove</h2>
            <p className="mt-2 text-muted-foreground">Glow stage: Radiant Initiate</p>
          </div>
        </section>
        <div className="grid gap-6">
          <StatsStrip />
          <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Today’s gentle focus</p>
                <h2 className="text-2xl font-bold text-foreground">Keep the flame soft and steady.</h2>
              </div>
              <Sparkles className="h-8 w-8 text-spirit" />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {questGroups.dailyQuests.map((quest) => <QuestCard key={quest.title} quest={quest} />)}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Skill tree wheel</h2>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">74% balanced</span>
          </div>
          <SkillWheel />
        </section>
        <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-2xl font-bold text-foreground">Customize your sanctuary</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-border/70 bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Color theme</p>
              </div>
              <div className="mt-4 flex gap-3">
                {['bg-spirit','bg-water','bg-fire','bg-earth','bg-air'].map((item) => <span key={item} className={`h-9 w-9 rounded-full border border-border ${item}`} />)}
              </div>
            </div>
            <div className="rounded-3xl border border-border/70 bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <Rows3 className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Dashboard layout</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['Focus','Balanced','Quest'].map((item) => <span key={item} className="rounded-2xl bg-secondary px-3 py-3 text-center text-sm font-semibold text-secondary-foreground">{item}</span>)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageFrame>
  );
}
