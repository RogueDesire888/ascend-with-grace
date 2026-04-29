import { createFileRoute } from "@tanstack/react-router";
import { PageFrame, QuestCard, questGroups } from "@/components/platform/PlatformUI";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "Healing Quests — Ascend" },
      {
        name: "description",
        content: "Daily, weekly, and main story quests for holistic healing growth.",
      },
      { property: "og:title", content: "Healing Quests — Ascend" },
      {
        property: "og:description",
        content:
          "Complete gentle quests across herbal wisdom, energy mastery, movement, touch, and spirit.",
      },
    ],
  }),
  component: QuestsPage,
});

function QuestSection({
  title,
  helper,
  children,
}: {
  title: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-muted-foreground">{helper}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">{children}</div>
    </section>
  );
}

function QuestsPage() {
  return (
    <PageFrame
      eyebrow="Quest board"
      title="Choose one small practice and let your avatar glow brighter."
    >
      <div className="rounded-[2rem] border border-border/70 bg-[var(--gradient-panel)] p-6 shadow-[var(--shadow-aura)]">
        <div className="grid gap-4 md:grid-cols-3">
          {["Daily reset: 3 open", "Weekly path: 2 active", "Main story: chapter I"].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-card/70 p-5 text-center font-semibold text-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <QuestSection
        title="Daily quests"
        helper="Five-minute practices that keep the journey light and consistent."
      >
        {questGroups.dailyQuests.map((quest) => (
          <QuestCard key={quest.title} quest={quest} />
        ))}
      </QuestSection>
      <QuestSection
        title="Weekly quests"
        helper="Deeper rituals, group sessions, and nourishing healing experiments."
      >
        {questGroups.weeklyQuests.map((quest) => (
          <QuestCard key={quest.title} quest={quest} variant="weekly" />
        ))}
      </QuestSection>
      <QuestSection
        title="Main story quests"
        helper="A guided path from awakening to embodied healer."
      >
        {questGroups.mainQuests.map((quest) => (
          <QuestCard key={quest.title} quest={quest} variant="main" />
        ))}
      </QuestSection>
    </PageFrame>
  );
}
