import { createFileRoute } from "@tanstack/react-router";
import { PageFrame, SkillProgressCard, SkillWheel } from "@/components/platform/PlatformUI";
import { skillTrees } from "@/components/platform/data";

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
          {skillTrees.map((tree) => (
            <SkillProgressCard key={tree.name} tree={tree} />
          ))}
        </section>
      </div>
    </PageFrame>
  );
}
