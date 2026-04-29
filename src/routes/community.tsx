import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { CommunityFeed, PageFrame } from "@/components/platform/PlatformUI";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Supportive Healing Community — Ascend" },
      {
        name: "description",
        content:
          "A private, supportive community space for sharing progress and joining group healing challenges.",
      },
      { property: "og:title", content: "Supportive Healing Community — Ascend" },
      {
        property: "og:description",
        content: "Share progress, receive encouragement, and join calm group challenges.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <PageFrame
      eyebrow="Community"
      title="A private circle for encouragement, progress, and gentle accountability."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <CommunityFeed />
        <aside className="grid content-start gap-5">
          <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Group challenge</h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              Seven days of soft morning breathwork. Complete with the circle to earn a shared glow
              bloom.
            </p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[62%] rounded-full bg-primary shadow-[var(--shadow-glow)]" />
            </div>
          </section>
          <section className="rounded-[2rem] border border-border/70 bg-card/75 p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-earth" />
              <h2 className="text-2xl font-bold text-foreground">Protected tone</h2>
            </div>
            <p className="mt-4 text-muted-foreground">
              The space is designed for privacy, warmth, consent, and non-performative growth.
            </p>
          </section>
          <section className="rounded-[2rem] border border-primary/30 bg-[var(--gradient-panel)] p-6 shadow-[var(--shadow-aura)]">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">Share a small win</h2>
            <p className="mt-2 text-muted-foreground">
              Invite support without pressure. Every gentle step counts.
            </p>
          </section>
        </aside>
      </div>
    </PageFrame>
  );
}
