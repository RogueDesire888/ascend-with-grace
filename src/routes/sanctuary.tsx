import { createFileRoute } from "@tanstack/react-router";
import { SanctuaryWorld } from "@/components/platform/SanctuaryWorld";

export const Route = createFileRoute("/sanctuary")({
  head: () => ({
    meta: [
      { title: "Interactive Floating Sanctuary — Ascend" },
      {
        name: "description",
        content:
          "Walk through a celestial floating temple world where each sanctuary area opens quests and skill-tree growth.",
      },
      { property: "og:title", content: "Interactive Floating Sanctuary — Ascend" },
      {
        property: "og:description",
        content:
          "Explore a third-person celestial sanctuary with avatar movement, quests, and holistic skill trees.",
      },
    ],
  }),
  component: SanctuaryPage,
});

function SanctuaryPage() {
  return <SanctuaryWorld />;
}
