import { createFileRoute } from "@tanstack/react-router";
import { SanctuaryWorld } from "@/components/platform/SanctuaryWorld";

export const Route = createFileRoute("/sanctuary")({
  head: () => ({
    meta: [
      { title: "The Sanctuary Dashboard — Ascend" },
      {
        name: "description",
        content:
          "Your central hub for avatar glow, Ascension Level, daily quests, streaks, and healing skill trees.",
      },
      { property: "og:title", content: "The Sanctuary Dashboard — Ascend" },
      {
        property: "og:description",
        content: "Track your elemental avatar, quests, streaks, and holistic healing progress.",
      },
    ],
  }),
  component: SanctuaryPage,
});

function SanctuaryPage() {
  return <SanctuaryWorld />;
}
